from pathlib import Path
from PIL import Image
import shutil
import zipfile

root = Path(__file__).parent / 'kit-logo-acessaweb'
for folder in ('png', 'jpg', 'webp', 'icones', 'originais'):
    (root / folder).mkdir(parents=True, exist_ok=True)
logo = Image.open(root / 'originais/logo-preparada.png').convert('RGBA')
assert logo.getchannel('A').getextrema()[0] == 0, 'Transparência ausente'
logo.save(root / 'png/acessaweb-logo.png')
for width in (800, 400):
    logo.resize((width, round(logo.height * width / logo.width)), Image.Resampling.LANCZOS).save(root / f'png/acessaweb-logo-{width}.png')
white = Image.new('RGB', logo.size, 'white')
white.paste(logo, mask=logo.getchannel('A'))
white.save(root / 'jpg/acessaweb-logo.jpg', quality=95)
logo.save(root / 'webp/acessaweb-logo.webp', lossless=True)
# Isolate the existing symbol for icon-format exports; no redraw.
symbol = logo.crop((80, 180, 590, 575))
symbol = symbol.crop(symbol.getchannel('A').getbbox())
icon = Image.new('RGBA', (512,512), (255,255,255,0))
symbol.thumbnail((440,440), Image.Resampling.LANCZOS)
icon.alpha_composite(symbol, ((512-symbol.width)//2,(512-symbol.height)//2))
icon.save(root / 'icones/simbolo-512.png')
icon.save(root / 'icones/favicon.ico', sizes=[(16,16),(32,32),(48,48),(64,64),(128,128),(256,256)])
apple = Image.new('RGB', icon.size, 'white')
apple.paste(icon, mask=icon.getchannel('A'))
apple.resize((180,180), Image.Resampling.LANCZOS).save(root / 'icones/apple-touch-icon.png')
site = root.parent.parent / 'imagem/identidade'
for asset, name in [('png/acessaweb-logo-800.png', 'logo-acessaweb.png'), ('icones/favicon.ico', 'favicon.ico'), ('icones/apple-touch-icon.png', 'apple-touch-icon.png')]:
    shutil.copy2(root / asset, site / name)
for file in root.rglob('*'):
    if file.suffix in ('.png','.jpg','.webp','.ico'):
        with Image.open(file) as check:
            check.verify()
archive = root.parent / 'AcessaWEB-kit-logo-dialogo.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
    for file in sorted(root.rglob('*')):
        if file.is_file():
            z.write(file, file.relative_to(root.parent))
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    print(f'{archive.resolve()} | {len(z.namelist())} arquivos | {archive.stat().st_size} bytes')
