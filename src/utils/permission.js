import useUserStore from '@/store/modules/user'

/**
 * 角色权限校验
 * @param {Array} value 校验值
 * @returns {Boolean}
 */
export function checkPermission(value) {
  const menuList = useUserStore().menuList
  if (value) {
    return menuList.includes(value);
  } else {
    console.error('need permission! Like v-if="1000"');
    return false;
  }
}
