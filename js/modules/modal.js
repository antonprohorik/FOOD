function modal () {
    //MODAL

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalClose = document.querySelector('[data-close]');

     function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            clearInterval(modalTimerId);
          }

    modalTrigger.forEach(btn => {
      btn.addEventListener('click', openModal);
    });


      function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }

      modalClose.addEventListener('click', closeModal);
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
          closeModal();
        }
      });

      const modalTimerId = setTimeout(openModal, 7000);

      function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
          openModal();
          window.removeEventListener('scroll', showModalByScroll);
        }
      }

      window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;