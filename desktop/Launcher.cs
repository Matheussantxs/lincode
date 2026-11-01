using System;
using System.IO;
using System.IO.Compression;
using System.Diagnostics;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading;
using System.Net;
using System.Drawing;
using System.Windows.Forms;

class Launcher : Form {
 const string BuildId="BUILD_ID";
 Process server; string address; string root; string appDir;
 Label status=new Label(); Button open=new Button();
 [STAThread] static int Main(string[] args) {
  bool test=Array.IndexOf(args,"--self-test")>=0;
  Launcher app=null;
  try {
   app=new Launcher();
   if(test){ app.Prepare(); app.StartServer(true);
    using(var web=new WebClient()){string health=web.DownloadString(app.address+"/api/health");string html=web.DownloadString(app.address+"/");if(!health.Contains("supabase")||!html.Contains("Lincode"))throw new Exception("Falha na verificação HTTP.");}
    File.WriteAllText(Path.Combine(app.root,"self-test.txt"),"PASS: embedded extraction, bundled Node, HTTP health, Lincode HTML; no installed Node required.");app.StopServer();return 0;
   }
   Application.EnableVisualStyles();Application.Run(app);return 0;
  } catch(Exception e){if(test&&app!=null)File.WriteAllText(Path.Combine(app.root,"self-test.txt"),"FAIL: "+e.Message);else MessageBox.Show(e.Message,"Lincode",MessageBoxButtons.OK,MessageBoxIcon.Error);if(app!=null)app.StopServer();return 1;}
 }
 public Launcher(){
  root=Environment.GetEnvironmentVariable("LINCODE_DESKTOP_HOME")??Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),"Lincode");
  root=Path.GetFullPath(root);Directory.CreateDirectory(root);appDir=Path.Combine(root,"app-"+BuildId);
  Text="Lincode";Size=new Size(520,275);StartPosition=FormStartPosition.CenterScreen;BackColor=Color.FromArgb(12,12,14);ForeColor=Color.White;Font=new Font("Segoe UI",11);FormBorderStyle=FormBorderStyle.FixedDialog;MaximizeBox=false;
  var title=new Label{Text="Lincode",Font=new Font("Segoe UI",25,FontStyle.Bold),Location=new Point(25,20),AutoSize=true,ForeColor=Color.FromArgb(255,118,103)};Controls.Add(title);
  status.Text="Preparando seu ambiente de estudos…";status.Location=new Point(25,85);status.Size=new Size(455,55);Controls.Add(status);
  open.Text="Abrir Lincode";open.Location=new Point(25,155);open.Size=new Size(190,42);open.Enabled=false;open.Click+=(s,e)=>OpenBrowser();Controls.Add(open);
  var close=new Button{Text="Encerrar",Location=new Point(235,155),Size=new Size(145,42)};close.Click+=(s,e)=>Close();Controls.Add(close);
  Shown+=(s,e)=>{try{Prepare();StartServer(false);status.Text="Pronto. Estude no navegador.\nMantenha esta janela aberta.";open.Enabled=true;OpenBrowser();}catch(Exception ex){status.Text="Não foi possível iniciar. "+ex.Message;}};
  FormClosed+=(s,e)=>StopServer();
 }
 void Prepare(){
  var marker=Path.Combine(appDir,".complete");if(File.Exists(marker))return;
  Directory.CreateDirectory(appDir);
  using(var stream=Assembly.GetExecutingAssembly().GetManifestResourceStream("lincode.payload.zip"))
  using(var zip=new ZipArchive(stream,ZipArchiveMode.Read))foreach(var item in zip.Entries){
   string target=Path.GetFullPath(Path.Combine(appDir,item.FullName));if(!target.StartsWith(appDir+Path.DirectorySeparatorChar,StringComparison.OrdinalIgnoreCase))throw new Exception("Arquivo de instalação inválido.");
   if(item.Name.Length==0){Directory.CreateDirectory(target);continue;}Directory.CreateDirectory(Path.GetDirectoryName(target));item.ExtractToFile(target,true);
  }
  File.WriteAllText(marker,BuildId);
 }
 void StartServer(bool test){
  var ready=new ManualResetEvent(false);
  var info=new ProcessStartInfo(Path.Combine(appDir,"runtime","node.exe"),"server.mjs"){WorkingDirectory=appDir,UseShellExecute=false,CreateNoWindow=true,RedirectStandardOutput=true,RedirectStandardError=true};
  info.EnvironmentVariables["PORT"]=test?"0":"8790";
  info.EnvironmentVariables["NODE_ENV"]="development";
  info.EnvironmentVariables.Remove("NODE_OPTIONS");
  info.EnvironmentVariables["LINCODE_ENV_FILE"]=Path.Combine(root,".env.local");
  info.EnvironmentVariables["APP_ORIGIN"]="http://127.0.0.1:"+(test?"0":"8790");
  if(test)info.EnvironmentVariables.Remove("APP_ORIGIN");
  server=new Process{StartInfo=info,EnableRaisingEvents=true};
  server.OutputDataReceived+=(s,e)=>{if(e.Data==null)return;var m=Regex.Match(e.Data,@"http://127\.0\.0\.1:\d+");if(m.Success){address=m.Value;ready.Set();}};
  server.ErrorDataReceived+=(s,e)=>{};
  server.Exited+=(s,e)=>ready.Set();
  server.Start();server.BeginOutputReadLine();server.BeginErrorReadLine();
  if(!ready.WaitOne(20000)||address==null||server.HasExited)throw new Exception("Porta 8790 ocupada ou configuração inválida. Consulte a documentação local.");
 }
 void OpenBrowser(){if(address!=null)Process.Start(new ProcessStartInfo(address){UseShellExecute=true});}
 void StopServer(){try{if(server!=null&&!server.HasExited){server.Kill();server.WaitForExit(5000);}}catch{}finally{if(server!=null)server.Dispose();server=null;}}
}
