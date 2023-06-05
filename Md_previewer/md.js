 const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');

    function updatePreview() {
      const markdown = editor.value;
      const html = marked(markdown, { gfm: true, breaks: true });
      preview.innerHTML = html;
    }

    editor.addEventListener('input', updatePreview);

    updatePreview();
