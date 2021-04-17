export function doRole (roleId) {
  let result = ''
  if (roleId === '0') {
    result = 'free'
  } else if (roleId === '1') {
    result = 'vip1'
  } else if (roleId === '2') {
    result = 'vip2'
  } else if (roleId === '3') {
    result = 'vip3'
  } else if (roleId === '4') {
    result = 'vip4'
  } else if (roleId === '5') {
    result = 'vip5'
  } else if (roleId === '6') {
    result = 'super'
  }
  return result
}
