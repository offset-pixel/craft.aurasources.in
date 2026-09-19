import os
import glob
from PIL import Image, ImageDraw, ImageFilter
import sys

# Mapping of artifact filename prefix to stone ID
mapping = {
    'amethyst_bead': 'amethyst',
    'citrine_bead': 'citrine',
    'clear_quartz_bead': 'clear-quartz',
    'evil_eye_bead': 'evil-eyes',
    'hematite_bead': 'hematite',
    'lapis_lazuli_bead': 'lapis-lazuli',
    'lava_stone_bead': 'lava-marble',
    'malachite_bead': 'malachite',
    'moss_agate_bead': 'moss-agate',
    'rose_quartz_bead': 'rose-quartz',
    'sunstone_bead': 'sunstone',
    'tiger_eye_bead': 'tiger-eye',
    'turquoise_bead': 'firoza'
}

def process_image(input_path, output_path, patch_hole=True):
    img = Image.open(input_path).convert("RGBA")
    
    gray = img.convert("L")
    bbox = None
    width, height = img.size
    
    for y in range(height):
        for x in range(width):
            if gray.getpixel((x, y)) < 240:
                if bbox is None:
                    bbox = [x, y, x, y]
                else:
                    bbox[0] = min(bbox[0], x)
                    bbox[1] = min(bbox[1], y)
                    bbox[2] = max(bbox[2], x)
                    bbox[3] = max(bbox[3], y)
                    
    if bbox is None:
        print("Could not find bead in", input_path)
        return
        
    img_cropped = img.crop((bbox[0], bbox[1], bbox[2]+1, bbox[3]+1))
    
    w, h = img_cropped.size
    size = min(w, h)
    
    img_sq = img_cropped.resize((size, size), Image.Resampling.LANCZOS)
    
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    result = Image.new("RGBA", (size, size), (0,0,0,0))
    result.paste(img_sq, (0,0), mask=mask)
    
    if patch_hole:
        hole_radius = int(size * 0.15)
        cx, cy = size // 2, size // 2
        
        patch_size = hole_radius * 2
        patch = result.crop((cx - hole_radius, cy - hole_radius * 3, cx + hole_radius, cy - hole_radius))
        
        patch_mask = Image.new("L", (patch_size, patch_size), 0)
        pdraw = ImageDraw.Draw(patch_mask)
        pdraw.ellipse((0, 0, patch_size, patch_size), fill=255)
        
        patch_mask = patch_mask.filter(ImageFilter.GaussianBlur(2))
        
        result.paste(patch, (cx - hole_radius, cy - hole_radius), patch_mask)
        
    result.save(output_path)
    print("Processed", output_path)

brain_dir = '/Users/jd/.gemini/antigravity-ide/brain/645fc760-1072-4b75-8a41-6f112b10990e'
out_dir = '/Users/jd/Dev/Website/AuraSources/assets/stones'
os.makedirs(out_dir, exist_ok=True)

for file in glob.glob(os.path.join(brain_dir, '*_bead_*.jpg')):
    basename = os.path.basename(file)
    prefix = basename.rsplit('_', 1)[0]
    if prefix in mapping:
        stone_id = mapping[prefix]
        out_path = os.path.join(out_dir, f"{stone_id}.png")
        patch = (stone_id != 'evil-eyes')
        process_image(file, out_path, patch_hole=patch)

