import acl from '../libs/acl';

const CLS = 'acl-hide';

export default {
    inserted: function (el, binding) {
        if (!binding.value || acl.verify(binding.value, binding.arg)) {
            el.classList.remove(CLS);
        } else {
            el.classList.add(CLS);
        }
    },
}