document.addEventListener('DOMContentLoaded', function () {
  const modalContainer = document.querySelector('.modal-container');
  const modalHideBtn = document.getElementById('modal-hide-btn');
  const steps = Array.from(document.querySelectorAll('.step'));
  const nextBtns = document.querySelectorAll('.next-btn');
  const prevBtns = document.querySelectorAll('.prev-btn');
  const form = document.querySelector('#multi-step-form');
  const fileInputs = document.querySelectorAll("input[type='file']");
  const maxFileSize = 150 * 1024; // 150 KB
  const minFileSize = 50 * 1024; // 50 KB

  // Hide modal
  const hideModal = () => modalContainer.classList.remove('active');

  // Initialize first step
  let currentStep = 0;
  steps[currentStep].classList.add('active');

  // Show the current step
  const showStep = step => {
    steps.forEach((stepElement, index) => {
      stepElement.classList.toggle('hidden', index !== currentStep);
    });
    updateStepInfo();
    updateIndicatorPoints();
  };

  // Update Step Info
  const updateStepInfo = () => {
    const infos = document.querySelectorAll('.step-info .info');
    infos.forEach((info, index) => {
      info.classList.toggle('active', index === currentStep);
    });
  };

  // Update step indicator points
  const updateIndicatorPoints = () => {
    const indicatorPoints = document.querySelectorAll('.indicator .points');
    indicatorPoints.forEach((point, index) => {
      point.classList.toggle('filled', index <= currentStep);
    });
  };

  // Handle next button click
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStep(currentStep)) {
        currentStep = Math.min(currentStep + 1, steps.length - 1);
        showStep(currentStep);
      }
    });
  });

  // Handle previous button click
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentStep = Math.max(currentStep - 1, 0);
      showStep(currentStep);
    });
  });

  // Validate current step
  const validateStep = step => {
    const inputs = steps[step].querySelectorAll('input, select');
    for (const input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  };

  // Hide Modal on clicking Modal-Hide-Btn
  modalHideBtn.addEventListener('click', () => {
    form.reset();
    currentStep = 0;
    showStep(currentStep);
    hideModal();
  });

  // Handle form submit
  // form.addEventListener('submit', e => {
  //   e.preventDefault();
  //   if (validateStep(currentStep)) {
  //     alert('Form submitted successfully!');
  //     form.reset();
  //     currentStep = 0;
  //     showStep(currentStep);
  //     hideModal();
  //   }
  // });

  // Handle file input changes
  fileInputs.forEach(input => {
    input.addEventListener('change', event => {
      const file = event.target.files[0];
      if (file) {
        if (file.size > maxFileSize) {
          alert('File is too large. Maximum size is 150KB.');
          event.target.value = '';
        } else if (file.size < minFileSize) {
          alert('File is too small. Minimum size is 50KB.');
          event.target.value = '';
        }
      }
    });
  });
});
