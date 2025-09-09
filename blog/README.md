# Blog Post Conversion Tool

This tool helps convert Microsoft Word documents into HTML blog posts for the website. It automatically handles the conversion process and updates the blog index page.

## Setup

1. Install Python 3.6 or higher if you haven't already
2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Write your blog post in Microsoft Word using the following formatting:
   - Use "Heading 1" for the main title
   - Use "Heading 2" and "Heading 3" for section headings
   - Use "List Bullet" for bullet points
   - Use regular paragraphs for body text

2. Save your Word document in the same directory as the script

3. Run the conversion script:
   ```bash
   python convert_blog.py <docx_file> "<title>" "<category>" "[date]"
   ```

   Example:
   ```bash
   python convert_blog.py my_post.docx "Understanding Anxiety" "Mental Health" "May 1, 2024"
   ```

   Note: The date is optional. If not provided, it will use today's date.

## What the Script Does

1. Converts your Word document to HTML format
2. Creates a new blog post file in the `posts` directory
3. Updates the blog index page with the new post
4. Maintains consistent styling with the website

## Tips for Writing Blog Posts

1. Keep your Word document well-formatted:
   - Use proper heading styles
   - Use bullet points for lists
   - Keep paragraphs concise
   - Use bold and italic text sparingly

2. Images:
   - Add images to the `images` directory
   - Use descriptive filenames
   - Optimize images for web use

3. Categories:
   - Use consistent categories across posts
   - Common categories include:
     - Mental Health
     - Self-Care
     - Relationships
     - Therapy
     - Personal Growth

## Troubleshooting

If you encounter any issues:

1. Make sure your Word document is properly formatted
2. Check that all required fields are provided
3. Ensure you have write permissions in the directory
4. Verify that the blog index page exists and is properly formatted

For additional help, please contact the website administrator.