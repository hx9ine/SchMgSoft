// document.addEventListener('DOMContentLoaded', () => {
//   const boldTextBtn = document.getElementById('bold');
//   const italicTextBtn = document.getElementById('italic');
//   const underlineTextBtn = document.getElementById('underline');
//   const textColorBtn = document.getElementById('color');
//   const fileAttachBtn = document.getElementById('file');
//   const fileInput = document.getElementById('file-input');
//   const imageAttachBtn = document.getElementById('image');
//   const imageInput = document.getElementById('image-input');
//   const linkAttachBtn = document.getElementById('link');
//   const confidentialBtn = document.getElementById('confidential');
//   const leftAlignBtn = document.getElementById('left');
//   const centerAlignBtn = document.getElementById('center');
//   const rightAlignBtn = document.getElementById('right');
//   const justifyAlignBtn = document.getElementById('justify');
//   const deleteBtn = document.getElementById('delete');

//   const message = document.getElementById('message');

//   function applyStyle(style) {
//     document.execCommand(style, false, null);
//   }

//   boldTextBtn.addEventListener('click', () => applyStyle('bold'));
//   italicTextBtn.addEventListener('click', () => applyStyle('italic'));
//   underlineTextBtn.addEventListener('click', () => applyStyle('underline'));

//   fileAttachBtn.addEventListener('click', () => {
//     fileInput.click();
//   });
//   // Add an event listener to the file input element
//   fileInput.addEventListener('change', handleFileSelect, false);
//   // Function to handle the file selection
//   function handleFileSelect(event) {
//     const file = event.target.files[0]; // Get the selected file

//     if (file) {
//       const reader = new FileReader();

//       // Add an event listener to the FileReader instance
//       reader.addEventListener('load', handleFileLoad, false);

//       // Read the file as text or perform any required operations
//       // Here, we're reading the file as text, but you can also use readAsDataURL for images, etc.
//       reader.readAsText(file);
//     }
//   }

//   // Function to handle the file load
//   function handleFileLoad(event) {
//     const fileContent = event.target.result; // Get the file content

//     // Perform any operations with the file content
//     console.log(fileContent);
//     // ...rest of your code
//   }

//   imageAttachBtn.addEventListener('click', () => {
//     imageInput.click();
//   });
//   // Add an event listener to the file input element
//   imageInput.addEventListener('change', handleImageSelect, false);
//   // Function to handle the file selection
//   function handleImageSelect(event) {
//     const image = event.target.files[0]; // Get the selected file

//     if (image) {
//       const reader = new FileReader();

//       // Add an event listener to the FileReader instance
//       reader.addEventListener('load', handleImageLoad, false);

//       // Read the file as text or perform any required operations
//       // Here, we're reading the file as text, but you can also use readAsDataURL for images, etc.
//       reader.readAsText(image);
//     }
//   }

//   // Function to handle the file load
//   function handleImageLoad(event) {
//     const imageContent = event.target.result; // Get the file content

//     // Perform any operations with the file content
//     console.log(imageContent);
//     // ...rest of your code
//   }

//   linkAttachBtn.addEventListener('click', () => {
//     const url = prompt('Enter the URL:');
//     if (url) {
//       applyStyle('createLink', url);
//     }
//   });

//   leftAlignBtn.addEventListener('click', () => applyStyle('justifyLeft'));
//   centerAlignBtn.addEventListener('click', () => applyStyle('justifyCenter'));
//   rightAlignBtn.addEventListener('click', () => applyStyle('justifyRight'));
//   justifyAlignBtn.addEventListener('click', () => applyStyle('justifyFull'));
//   deleteBtn.addEventListener('click', () => applyStyle('delete'));

//   // More functionality for other buttons can be added here

//   textColorBtn.addEventListener('click', () => {
//     const color = prompt('Enter the color:', '#000000');
//     document.execCommand('foreColor', false, color);
//   });

//   deleteBtn.addEventListener('click', () => {
//     message.innerHTML = '';
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const selectedTeachers = new Set();

  const input = document.getElementById('recipient-input');
  const dropdown = document.getElementById('dropdown');
  const teacherList = document.getElementById('teacher-list');
  const addAllButton = document.getElementById('add-all');
  const form = document.getElementById('notification-form');
  const messageDiv = document.getElementById('message');
  const hiddenMessageInput = document.getElementById('hidden-message');
  const recipientInputHidden = document.createElement('input');

  // Form submission
  form.addEventListener('submit', event => {
    // Extract plain text from the contenteditable div
    hiddenMessageInput.value = messageDiv.innerText.trim();
  });

  recipientInputHidden.type = 'hidden';
  recipientInputHidden.name = 'recipient_ids';
  form.appendChild(recipientInputHidden);

  // Show Dropdown
  function showDropdown() {
    dropdown.style.display = 'block';
  }

  // Hide Dropdown
  function hideDropdown() {
    dropdown.style.display = 'none';
  }

  function updateRecipientInput() {
    recipientInputHidden.value = Array.from(selectedTeachers).join(',');
  }

  function addTeacherBadge(teacherId, teacherName) {
    const badge = document.createElement('span');
    badge.className = 'badge';
    badge.textContent = teacherName;

    const removeBtn = document.createElement('span');
    removeBtn.textContent = '✕';
    removeBtn.addEventListener('click', () => {
      badge.remove();
      selectedTeachers.delete(teacherId);
      updateRecipientInput();
      populateTeacherList(input.value);
    });

    badge.appendChild(removeBtn);
    const badgeContainer = document.createElement('div');
    badgeContainer.appendChild(badge);
    input.before(badgeContainer);

    selectedTeachers.add(teacherId);
    updateRecipientInput();
  }

  function populateTeacherList(filter = '') {
    const teacherItems = teacherList.querySelectorAll('li');
    teacherItems.forEach(li => {
      if (
        li.textContent.toLowerCase().includes(filter.toLowerCase()) &&
        !selectedTeachers.has(li.dataset.id)
      ) {
        li.style.display = 'block';
      } else {
        li.style.display = 'none';
      }
    });
  }

  input.addEventListener('focus', () => {
    populateTeacherList();
    showDropdown();
  });

  input.addEventListener('input', () => {
    const filter = input.value;
    populateTeacherList(filter);
    showDropdown();
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.recipient-container')) {
      hideDropdown();
    }
  });

  teacherList.addEventListener('click', e => {
    if (e.target.tagName === 'LI') {
      const teacherId = e.target.dataset.id;
      const teacherName = e.target.textContent;
      addTeacherBadge(teacherId, teacherName);
      hideDropdown();
      input.value = '';
    }
  });

  addAllButton.addEventListener('click', () => {
    const teacherItems = teacherList.querySelectorAll('li');
    teacherItems.forEach(li => {
      const teacherId = li.dataset.id;
      const teacherName = li.textContent;
      if (!selectedTeachers.has(teacherId)) {
        addTeacherBadge(teacherId, teacherName);
      }
    });
    hideDropdown();
  });

  populateTeacherList();
});
