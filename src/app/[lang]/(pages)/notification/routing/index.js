import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

export const NotificationRouting = ({ dictionary, locale }) => (

    <MenuItem href={`/${locale}/notification/notification`}>{dictionary['navigation'].viewAllNotification}</MenuItem>


)
