import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-blue/theme.css'

import AutoComplete from 'primevue/autocomplete'
import Calendar from 'primevue/calendar'
import CascadeSelect from 'primevue/cascadeselect'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import Editor from 'primevue/editor'
import FloatLabel from 'primevue/floatlabel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import SelectButton from 'primevue/selectbutton'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import SpeedDial from 'primevue/speeddial'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Skeleton from 'primevue/skeleton'
import Timeline from 'primevue/timeline'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import ScrollPanel from 'primevue/scrollpanel'
import Toolbar from 'primevue/toolbar'
import ConfirmDialog from 'primevue/confirmdialog'
import Sidebar from 'primevue/sidebar'
import Tooltip from 'primevue/tooltip'
import PanelMenu from 'primevue/panelmenu'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Inplace from 'primevue/inplace'
import ScrollTop from 'primevue/scrolltop'
import AnimateOnScroll from 'primevue/animateonscroll'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import 'primeicons/primeicons.css'
import Badge from 'primevue/badge'
import BadgeDirective from 'primevue/badgedirective'
import Menubar from 'primevue/menubar'
import TabMenu from 'primevue/tabmenu'
import Dialog from 'primevue/dialog'
//import VueSignaturePad from 'vue-signature-pad'
import Vue3Signature from 'vue3-signature'
import Image from 'primevue/image'
import ConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice'
import SplitButton from 'primevue/splitbutton'
import RadioButton from 'primevue/radiobutton'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, { ripple: true })

app.use(ConfirmationService)
app.use(ToastService)
app.use(Vue3Signature)

app.directive('tooltip', Tooltip)
app.directive('animateonscroll', AnimateOnScroll)
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)
app.directive('badge', BadgeDirective)

app.component('AutoComplete', AutoComplete)
app.component('Calendar', Calendar)
app.component('CascadeSelect', CascadeSelect)
app.component('Checkbox', Checkbox)
app.component('Dropdown', Dropdown)
app.component('Editor', Editor)
app.component('FloatLabel', FloatLabel)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputMask', InputMask)
app.component('InputNumber', InputNumber)
app.component('InputSwitch', InputSwitch)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('SelectButton', SelectButton)
app.component('Textarea', Textarea)
app.component('Button', Button)
app.component('SpeedDial', SpeedDial)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Skeleton', Skeleton)
app.component('Timeline', Timeline)
app.component('Card', Card)
app.component('Divider', Divider)
app.component('ScrollPanel', ScrollPanel)
app.component('Toolbar', Toolbar)
app.component('ConfirmDialog', ConfirmDialog)
app.component('Sidebar', Sidebar)
app.component('PanelMenu', PanelMenu)
app.component('Toast', Toast)
app.component('Inplace', Inplace)
app.component('ScrollTop', ScrollTop)
app.component('Tag', Tag)
app.component('Avatar', Avatar)
app.component('Badge', Badge)
app.component('Menubar', Menubar)
app.component('TabMenu', TabMenu)
app.component('Dialog', Dialog)
app.component('Image', Image)
//app.component('VueSignaturePad', VueSignaturePad)
app.component('ConfirmPopup', ConfirmPopup)
app.component('SplitButton', SplitButton)
app.component('RadioButton', RadioButton)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)

app.mount('#app')
