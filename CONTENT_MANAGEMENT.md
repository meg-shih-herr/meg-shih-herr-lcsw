# Content Management Guide

This website now uses a JSON-based content management system that allows you to easily copy/paste content from Word documents.

## How It Works

The website loads content from JSON files in the `content/` folder and populates the HTML dynamically. This means you can edit the content without touching HTML code.

## Content Files

### `content/main-page.json`
Contains all content for the main page (index.html):
- Hero section text
- "Therapy with me" content
- Services descriptions
- Education and experience sections
- Contact preview content
- Footer information

### `content/contact-page.json`
Contains all content for the contact page:
- Hero section text
- Contact information
- Form fields and labels
- FAQ content
- Footer information

### `content/blog-posts.json`
Contains blog post content:
- Post titles, dates, and categories
- Post content with paragraphs, headings, and subheadings

## How to Edit Content

### From Word Document to JSON

1. **Copy your content from Word**
2. **Open the appropriate JSON file** in a text editor (like Notepad, VS Code, etc.)
3. **Find the section you want to edit** (look for the field names like "title", "subtitle", etc.)
4. **Replace the text** between the quotes
5. **Save the file**

### Example: Editing the Hero Section

In `content/main-page.json`, find:
```json
"hero": {
  "title": "Therapy to Reconnect, Heal, and Flourish",
  "subtitle": "Trauma-informed therapy for those feeling stuck..."
}
```

Replace with your new content:
```json
"hero": {
  "title": "Your New Title Here",
  "subtitle": "Your new subtitle text here..."
}
```

### Important Notes

- **Keep the JSON structure intact** - don't remove quotes, commas, or brackets
- **Escape quotes in your text** - if you have quotes in your content, use `\"` instead of `"`
- **HTML tags are supported** - you can use `<em>`, `<strong>`, `<a href="">`, etc.
- **Save the file** after making changes
- **Refresh your browser** to see the changes

## Adding New Blog Posts

1. **Add your new post** to the `posts` array in `content/blog-posts.json`
2. **Follow the existing structure**:
```json
{
  "id": "your-post-id",
  "title": "Your Post Title",
  "date": "Month Day, Year",
  "category": "Category Name",
  "content": [
    {
      "type": "paragraph",
      "text": "Your paragraph text here..."
    },
    {
      "type": "heading",
      "text": "Your heading here..."
    },
    {
      "type": "subheading",
      "text": "Your subheading here..."
    }
  ]
}
```

## Content Types

- **paragraph**: Regular paragraph text
- **heading**: Main headings (h2)
- **subheading**: Subheadings (h3)

## Troubleshooting

- **Content not updating?** Make sure you saved the JSON file and refreshed the browser
- **JSON errors?** Check that all quotes and brackets are properly closed
- **Page not loading?** Check the browser console for JavaScript errors

## Benefits

- ✅ Easy copy/paste from Word documents
- ✅ No HTML knowledge required
- ✅ Version control friendly
- ✅ Maintains website design
- ✅ Good for SEO
- ✅ Easy to backup and restore content