from PIL import Image, ImageDraw, ImageFilter
import sys
import math

def process_image(input_path, output_path):
    # Open image
    img = Image.open(input_path).convert("RGBA")
    
    # 1. Find the bounding box of the bead (non-white pixels)
    # Convert to grayscale and threshold to find white background
    gray = img.convert("L")
    bbox = None
    width, height = img.size
    
    # Simple thresholding: anything brighter than 240 is background
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
        
    # Crop to the bounding box
    img_cropped = img.crop((bbox[0], bbox[1], bbox[2]+1, bbox[3]+1))
    
    # 2. Make it perfectly circular and remove background
    w, h = img_cropped.size
    size = min(w, h)
    
    # Resize to perfect square just in case
    img_sq = img_cropped.resize((size, size), Image.Resampling.LANCZOS)
    
    # Create circular mask
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((0, 0, size, size), fill=255)
    
    # Apply mask
    result = Image.new("RGBA", (size, size), (0,0,0,0))
    result.paste(img_sq, (0,0), mask=mask)
    
    # 3. Patch the center hole
    # Assuming hole is in the dead center, approx 15% of the radius
    hole_radius = int(size * 0.15)
    cx, cy = size // 2, size // 2
    
    # To patch it, we can copy an annular region around the hole and paste it inward, or blur it.
    # A simple way: take a patch from nearby (e.g. above the hole) and paste it over the hole, then blend.
    patch_size = hole_radius * 2
    patch = result.crop((cx - hole_radius, cy - hole_radius * 3, cx + hole_radius, cy - hole_radius))
    
    # Paste the patch over the hole
    patch_mask = Image.new("L", (patch_size, patch_size), 0)
    pdraw = ImageDraw.Draw(patch_mask)
    pdraw.ellipse((0, 0, patch_size, patch_size), fill=255)
    
    # Blur the edges of the patch mask for blending
    patch_mask = patch_mask.filter(ImageFilter.GaussianBlur(2))
    
    result.paste(patch, (cx - hole_radius, cy - hole_radius), patch_mask)
    
    # Save
    result.save(output_path)
    print("Processed", output_path)

if __name__ == "__main__":
    process_image(sys.argv[1], sys.argv[2])
