#!/usr/bin/env python3

import os
import sys
import re
from datetime import datetime
from docx import Document
import html

def clean_filename(title):
    """Convert title to a URL-friendly filename."""
    # Convert to lowercase and replace spaces with hyphens
    filename = title.lower()
    # Remove special characters
    filename = re.sub(r'[^a-z0-9\s-]', '', filename)
    # Replace spaces with hyphens
    filename = re.sub(r'\s+', '-', filename)
    return filename

def convert_paragraph_to_html(paragraph):
    """Convert a Word paragraph to HTML."""
    text = paragraph.text.strip()
    if not text:
        return ""

    # Handle different paragraph styles
    if paragraph.style.name.startswith('Heading'):
        level = int(paragraph.style.name[-1])
        return f"<h{level}>{text}</h{level}>"

    # Handle lists
    if paragraph.style.name.startswith('List'):
        return f"<li>{text}</li>"

    # Regular paragraph
    return f"<p>{text}</p>"

def create_blog_post(docx_path, title, category, date=None):
    """Convert a Word document to an HTML blog post."""
    if not os.path.exists(docx_path):
        print(f"Error: File {docx_path} not found.")
        return

    # Load the Word document
    doc = Document(docx_path)

    # Generate filename from title
    filename = clean_filename(title)
    output_path = f"blog/posts/{filename}.html"

    # Get current date if not provided
    if not date:
        date = datetime.now().strftime("%B %d, %Y")

    # Create HTML content
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Megan Shih, LCSW</title>
    <meta name="description" content="Read about {title} on Megan Shih's therapy blog. Professional insights and guidance for mental health and personal growth.">
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
    <nav class="navbar">
        <div class="nav-content">
            <a href="../index.html" class="nav-logo">Megan Shih, LCSW</a>
            <div class="nav-links">
                <a href="../index.html">Home</a>
                <a href="../index.html#about">About</a>
                <a href="../index.html#services">Services</a>
                <a href="../policies.html">Policies</a>
                <a href="../contact.html">Contact</a>
                <a href="../blog/index.html" class="active">Blog</a>
            </div>
        </div>
    </nav>

    <article class="blog-post" style="margin-top: 100px;">
        <header class="blog-post-header">
            <h1>{title}</h1>
            <div class="blog-post-meta">
                <span class="blog-post-date">{date}</span>
                <span class="blog-post-category">{category}</span>
            </div>
        </header>

        <div class="blog-post-content">
"""

    # Convert document content
    current_list = None
    for paragraph in doc.paragraphs:
        if paragraph.style.name.startswith('List'):
            if current_list is None:
                html_content += "<ul>\n"
                current_list = "ul"
            html_content += convert_paragraph_to_html(paragraph) + "\n"
        else:
            if current_list is not None:
                html_content += "</ul>\n"
                current_list = None
            html_content += convert_paragraph_to_html(paragraph) + "\n"

    # Close any open list
    if current_list is not None:
        html_content += "</ul>\n"

    # Add footer content
    html_content += """        </div>
    </article>

    <div class="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Schedule a consultation to begin your path to healing and growth.</p>
        <a href="../contact.html" class="cta-button">Schedule Consultation</a>
    </div>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contact</h3>
                <p>Email: megan@meganshihlcsw.com</p>
                <p>Phone: (415) 484-0533</p>
            </div>
            <div class="footer-section">
                <h3>Services</h3>
                <ul>
                    <li><a href="../index.html#services">Individual Therapy</a></li>
                    <li><a href="../index.html#services">Couples Therapy</a></li>
                    <li><a href="../index.html#services">Group Therapy</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Megan Shih, LCSW. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>"""

    # Write the HTML file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"Blog post created successfully at: {output_path}")
    return output_path

def update_blog_index(html_path, title, category, date):
    """Update the blog index page with the new post."""
    index_path = "blog/index.html"

    # Read the current index file
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Create the new blog post card
    new_post = f"""            <article class="blog-post-card">
                <div class="blog-post-thumbnail">
                    <img src="../images/blog-placeholder.jpg" alt="{title}">
                </div>
                <div class="blog-post-content">
                    <h2>{title}</h2>
                    <div class="blog-post-meta">
                        <span class="blog-post-date">{date}</span>
                        <span class="blog-post-category">{category}</span>
                    </div>
                    <p>Read more about {title.lower()} and discover insights for your personal growth journey.</p>
                    <a href="posts/{os.path.basename(html_path)}" class="read-more">Read More</a>
                </div>
            </article>"""

    # Insert the new post after the blog posts section
    insert_point = content.find('<div class="blog-posts">')
    if insert_point != -1:
        insert_point = content.find('</div>', insert_point) + 6
        new_content = content[:insert_point] + "\n" + new_post + content[insert_point:]

        # Write the updated content
        with open(index_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Blog index updated successfully.")
    else:
        print("Error: Could not find blog posts section in index file.")

def main():
    if len(sys.argv) < 4:
        print("Usage: python convert_blog.py <docx_file> <title> <category> [date]")
        print("Example: python convert_blog.py my_post.docx 'My Blog Post' 'Self-Care' 'May 1, 2024'")
        sys.exit(1)

    docx_path = sys.argv[1]
    title = sys.argv[2]
    category = sys.argv[3]
    date = sys.argv[4] if len(sys.argv) > 4 else None

    # Create the blog post
    html_path = create_blog_post(docx_path, title, category, date)
    if html_path:
        # Update the blog index
        update_blog_index(html_path, title, category, date)

if __name__ == "__main__":
    main()