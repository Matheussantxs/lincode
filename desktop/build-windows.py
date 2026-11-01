"""Build a standalone Windows launcher with bundled Node and tracked project files."""
from pathlib import Path
import subprocess, zipfile, hashlib, os
root=Path(__file__).resolve().parents[1]
out=root.parent
build=root/'.local'/'desktop-build';build.mkdir(parents=True,exist_ok=True)
node=Path(os.environ.get('LINCODE_NODE_EXE',r'C:\Program Files\nodejs\node.exe'))
compiler=Path(os.environ.get('WINDIR',r'C:\Windows'))/'Microsoft.NET/Framework64/v4.0.30319/csc.exe'
files=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z'],cwd=root).decode().split('\0')
payload=build/'payload.zip'
with zipfile.ZipFile(payload,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
 for name in sorted(set(files)):
  if not name:continue
  if name.startswith(('.local/','.data/','tools/','references/','public/')) or name.startswith('.env') and name!='.env.example':raise RuntimeError('Private file refused: '+name)
  z.write(root/name,name)
 z.write(node,'runtime/node.exe')
build_id=hashlib.sha256(payload.read_bytes()).hexdigest()[:12]
source=build/'Launcher.cs';source.write_text((root/'desktop/Launcher.cs').read_text(encoding='utf-8').replace('BUILD_ID',build_id),encoding='utf-8-sig')
exe=out/'Lincode.exe'
subprocess.run([str(compiler),'/nologo','/target:winexe','/platform:x64','/optimize+', '/out:'+str(exe),'/resource:'+str(payload)+',lincode.payload.zip','/reference:System.Windows.Forms.dll','/reference:System.Drawing.dll','/reference:System.IO.Compression.dll','/reference:System.IO.Compression.FileSystem.dll',str(source)],check=True)
(out/'Lincode.exe.sha256').write_text(hashlib.sha256(exe.read_bytes()).hexdigest()+'  Lincode.exe\n')
print('Built',exe,'bytes',exe.stat().st_size)
