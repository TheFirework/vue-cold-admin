import { renderIcon } from '@/utils'
import {
  AppstoreOutlined,
  AreaChartOutlined,
  AuditOutlined,
  BankOutlined,
  BellOutlined,
  BlockOutlined,
  CommentOutlined,
  ControlOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  QrcodeOutlined,
  RobotOutlined,
  RocketOutlined,
  SafetyOutlined,
  SettingFilled,
  SignalFilled,
  SkinOutlined,
  SlackOutlined,
  TableOutlined,
  GitlabOutlined
} from '@vicons/antd'
import { LogoWebComponent } from '@vicons/ionicons5'

//前端路由图标映射表
export const constantRouterIcon: { [key: string]: any } = {
  DashboardOutlined: renderIcon(DashboardOutlined),
  SettingFilled: renderIcon(SettingFilled),
  SafetyOutlined: renderIcon(SafetyOutlined),
  AppstoreOutlined: renderIcon(AppstoreOutlined),
  AreaChartOutlined: renderIcon(AreaChartOutlined),
  AuditOutlined: renderIcon(AuditOutlined),
  BankOutlined: renderIcon(BankOutlined),
  BellOutlined: renderIcon(BellOutlined),
  BlockOutlined: renderIcon(BlockOutlined),
  CommentOutlined: renderIcon(CommentOutlined),
  FileDoneOutlined: renderIcon(FileDoneOutlined),
  SlackOutlined: renderIcon(SlackOutlined),
  FileTextOutlined: renderIcon(FileTextOutlined),
  LogoWebComponent: renderIcon(LogoWebComponent),
  TableOutlined: renderIcon(TableOutlined),
  DatabaseOutlined: renderIcon(DatabaseOutlined),
  SkinOutlined: renderIcon(SkinOutlined),
  SignalFilled: renderIcon(SignalFilled),
  RobotOutlined: renderIcon(RobotOutlined),
  RocketOutlined: renderIcon(RocketOutlined),
  QrcodeOutlined: renderIcon(QrcodeOutlined),
  ControlOutlined: renderIcon(ControlOutlined),
  GitlabOutlined: renderIcon(GitlabOutlined)
}
