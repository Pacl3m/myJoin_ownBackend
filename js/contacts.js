let Contacts = [];

let nameTagsColors = ['#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700', '#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700', '#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700', '#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FFC700'];

let firstLetters = [];

let editSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<mask id="mask0_73072_5024" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_73072_5024)">
<path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
</g>
</svg>`;

let deleteSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<mask id="mask0_73072_2930" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_73072_2930)">
<path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z" fill="#2A3647"/>
</g>
</svg>`;

let capa2 = `<svg xmlns="http://www.w3.org/2000/svg" width="57" height="67" viewBox="0 0 57 67" fill="none">
<path d="M40.7397 0H28.4242V13.8957H40.7397V0Z" fill="white"/>
<path d="M28.4243 25.197H40.7397V44.7947C40.796 49.5105 39.4275 54.1362 36.8083 58.0839C34.222 61.9194 29.2295 66.4829 19.9929 66.4829C9.93211 66.4829 4.06806 61.8167 0.903931 59.2597L8.67215 49.8621C11.7605 52.3352 14.7351 54.3696 20.0403 54.3696C24.057 54.3696 25.658 52.7645 26.5959 51.3646C27.8709 49.4203 28.5304 47.1465 28.4906 44.8321L28.4243 25.197Z" fill="white"/>
<path d="M22.1434 16.4248H9.82792V28.5567H22.1434V16.4248Z" fill="#29ABE2"/>
<path d="M47.1911 60.7904C47.1911 63.3754 45.8554 64.7659 43.9891 64.7659C42.1228 64.7659 40.9008 63.1141 40.9008 60.9211C40.9008 58.728 42.1607 56.9922 44.0933 56.9922C46.0259 56.9922 47.1911 58.7 47.1911 60.7904ZM42.3312 60.8931C42.3312 62.4516 42.966 63.5994 44.0554 63.5994C45.1449 63.5994 45.7606 62.3862 45.7606 60.7997C45.7606 59.4092 45.1922 58.1027 44.0554 58.1027C42.9186 58.1027 42.3312 59.3626 42.3312 60.8931Z" fill="white"/>
<path d="M49.6353 57.104V64.6445H48.2711V57.104H49.6353Z" fill="white"/>
<path d="M51.1131 64.6445V57.104H52.6289L54.2583 60.2116C54.6778 61.0242 55.051 61.8592 55.3762 62.7127C55.2909 61.7795 55.253 60.7063 55.253 59.5117V57.104H56.5035V64.6445H55.092L53.4436 61.4715C53.0072 60.638 52.6182 59.7812 52.2784 58.9051C52.2784 59.8384 52.3447 60.8929 52.3447 62.1901V64.6351L51.1131 64.6445Z" fill="white"/>
</svg>  `;

let vector5 = `<svg xmlns="http://www.w3.org/2000/svg" width="94" height="3" viewBox="0 0 94 3" fill="none">
<path d="M92 1.5L2 1.5" stroke="#29ABE2" stroke-width="3" stroke-linecap="round"/>
</svg>`;

let group9SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
<circle cx="60" cy="60" r="60" fill="#D1D1D1"/>
</svg>`;

let personSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
<mask id="mask0_71395_17941" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">
  <rect width="64" height="64" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_71395_17941)">
  <path d="M32.0001 32.0001C29.0667 32.0001 26.5556 30.9556 24.4667 28.8667C22.3779 26.7779 21.3334 24.2667 21.3334 21.3334C21.3334 18.4001 22.3779 15.889 24.4667 13.8001C26.5556 11.7112 29.0667 10.6667 32.0001 10.6667C34.9334 10.6667 37.4445 11.7112 39.5334 13.8001C41.6223 15.889 42.6667 18.4001 42.6667 21.3334C42.6667 24.2667 41.6223 26.7779 39.5334 28.8667C37.4445 30.9556 34.9334 32.0001 32.0001 32.0001ZM48.0001 53.3334H16.0001C14.5334 53.3334 13.2779 52.8112 12.2334 51.7668C11.189 50.7223 10.6667 49.4668 10.6667 48.0001V45.8667C10.6667 44.3556 11.0556 42.9667 11.8334 41.7001C12.6112 40.4334 13.6445 39.4667 14.9334 38.8001C17.689 37.4223 20.489 36.389 23.3334 35.7001C26.1779 35.0112 29.0667 34.6667 32.0001 34.6667C34.9334 34.6667 37.8223 35.0112 40.6667 35.7001C43.5112 36.389 46.3112 37.4223 49.0667 38.8001C50.3556 39.4667 51.389 40.4334 52.1667 41.7001C52.9445 42.9667 53.3334 44.3556 53.3334 45.8667V48.0001C53.3334 49.4668 52.8112 50.7223 51.7668 51.7668C50.7223 52.8112 49.4668 53.3334 48.0001 53.3334ZM16.0001 48.0001H48.0001V45.8667C48.0001 45.3779 47.8779 44.9334 47.6334 44.5334C47.389 44.1334 47.0667 43.8223 46.6667 43.6001C44.2668 42.4001 41.8445 41.5001 39.4001 40.9001C36.9556 40.3001 34.489 40.0001 32.0001 40.0001C29.5112 40.0001 27.0445 40.3001 24.6001 40.9001C22.1556 41.5001 19.7334 42.4001 17.3334 43.6001C16.9334 43.8223 16.6112 44.1334 16.3667 44.5334C16.1223 44.9334 16.0001 45.3779 16.0001 45.8667V48.0001ZM32.0001 26.6667C33.4667 26.6667 34.7223 26.1445 35.7668 25.1001C36.8112 24.0556 37.3334 22.8001 37.3334 21.3334C37.3334 19.8667 36.8112 18.6112 35.7668 17.5667C34.7223 16.5223 33.4667 16.0001 32.0001 16.0001C30.5334 16.0001 29.2779 16.5223 28.2334 17.5667C27.189 18.6112 26.6667 19.8667 26.6667 21.3334C26.6667 22.8001 27.189 24.0556 28.2334 25.1001C29.2779 26.1445 30.5334 26.6667 32.0001 26.6667Z" fill="white"/>
</g>
</svg>`;

let personSmallSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<mask id="mask0_73933_810" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_73933_810)">
<path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z" fill="#A8A8A8"/>
</g>
</svg>`;

let emailSmallSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<mask id="mask0_73933_817" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_73933_817)">
<path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z" fill="#A8A8A8"/>
</g>
</svg>`;

let phoneSmallSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<mask id="mask0_73933_824" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
  <rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_73933_824)">
  <path d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z" fill="#A8A8A8"/>
</g>
</svg>`;

let xSmallSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<path d="M12.001 12.5001L17.244 17.7431M6.758 17.7431L12.001 12.5001L6.758 17.7431ZM17.244 7.25708L12 12.5001L17.244 7.25708ZM12 12.5001L6.758 7.25708L12 12.5001Z" stroke="#2A3647" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

let checkSmallSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
<mask id="mask0_73933_4578" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
  <rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_73933_4578)">
  <path d="M9.54996 15.65L18.025 7.175C18.225 6.975 18.4625 6.875 18.7375 6.875C19.0125 6.875 19.25 6.975 19.45 7.175C19.65 7.375 19.75 7.6125 19.75 7.8875C19.75 8.1625 19.65 8.4 19.45 8.6L10.25 17.8C10.05 18 9.81663 18.1 9.54996 18.1C9.2833 18.1 9.04996 18 8.84996 17.8L4.54996 13.5C4.34996 13.3 4.25413 13.0625 4.26246 12.7875C4.2708 12.5125 4.37496 12.275 4.57496 12.075C4.77496 11.875 5.01246 11.775 5.28746 11.775C5.56246 11.775 5.79996 11.875 5.99996 12.075L9.54996 15.65Z" fill="white"/>
</g>
</svg>`;

let addNewContactButton = `<button class="new-contact" onclick="renderAddNewContact()">
<p>New contact</p> 
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="33"
    viewBox="0 0 32 33" fill="none">
    <mask id="mask0_72255_869" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
    y="0" width="32" height="33">
    <rect y="0.5" width="32" height="32" fill="#D9D9D9" />
    </mask>
    <g mask="url(#mask0_72255_869)">
    <path
        d="M25.3294 19.1667C25.0134 19.1667 24.7499 19.0602 24.5388 18.8473C24.3277 18.6343 24.2222 18.3704 24.2222 18.0556V14.9445H21.111C20.7962 14.9445 20.5323 14.8376 20.3194 14.6239C20.1064 14.4102 19.9999 14.1454 19.9999 13.8295C19.9999 13.5136 20.1064 13.2501 20.3194 13.0389C20.5323 12.8278 20.7962 12.7223 21.111 12.7223H24.2222V9.61115C24.2222 9.29635 24.329 9.03246 24.5427 8.81948C24.7564 8.60653 25.0212 8.50005 25.3372 8.50005C25.6531 8.50005 25.9166 8.60653 26.1277 8.81948C26.3388 9.03246 26.4444 9.29635 26.4444 9.61115V12.7223H29.5555C29.8703 12.7223 30.1342 12.8291 30.3472 13.0428C30.5601 13.2566 30.6666 13.5214 30.6666 13.8373C30.6666 14.1532 30.5601 14.4167 30.3472 14.6278C30.1342 14.8389 29.8703 14.9445 29.5555 14.9445H26.4444V18.0556C26.4444 18.3704 26.3375 18.6343 26.1238 18.8473C25.9101 19.0602 25.6453 19.1667 25.3294 19.1667ZM11.9999 16.4778C10.5333 16.4778 9.31473 15.9926 8.34435 15.0223C7.374 14.0519 6.88882 12.8334 6.88882 11.3667C6.88882 9.90005 7.374 8.68154 8.34435 7.71118C9.31473 6.7408 10.5333 6.25562 11.9999 6.25562C13.4666 6.25562 14.6851 6.7408 15.6555 7.71118C16.6258 8.68154 17.111 9.90005 17.111 11.3667C17.111 12.8334 16.6258 14.0519 15.6555 15.0223C14.6851 15.9926 13.4666 16.4778 11.9999 16.4778ZM2.44435 27.1667C2.12955 27.1667 1.86566 27.0602 1.65269 26.8473C1.43973 26.6343 1.33325 26.3704 1.33325 26.0556V23.8334C1.33325 23.063 1.5314 22.3612 1.92769 21.7279C2.324 21.0945 2.8666 20.6186 3.55549 20.3C5.12586 19.5815 6.58022 19.0649 7.91855 18.75C9.25691 18.4352 10.6162 18.2779 11.9963 18.2779C13.3765 18.2779 14.737 18.4352 16.0777 18.75C17.4184 19.0649 18.8666 19.5815 20.4222 20.3C21.111 20.6334 21.6573 21.113 22.061 21.7389C22.4647 22.3649 22.6666 23.063 22.6666 23.8334V26.0556C22.6666 26.3704 22.5601 26.6343 22.3472 26.8473C22.1342 27.0602 21.8703 27.1667 21.5555 27.1667H2.44435ZM3.55545 24.9445H20.4444V23.8334C20.4444 23.5149 20.3648 23.2149 20.2055 22.9334C20.0462 22.6519 19.8073 22.4408 19.4888 22.3C18.0518 21.5963 16.7629 21.1204 15.6222 20.8723C14.4814 20.6241 13.274 20.5 11.9999 20.5C10.7259 20.5 9.51844 20.6278 8.37769 20.8834C7.23695 21.1389 5.94066 21.6112 4.48882 22.3C4.19991 22.4408 3.97212 22.6519 3.80545 22.9334C3.63879 23.2149 3.55545 23.5149 3.55545 23.8334V24.9445ZM11.9999 14.2556C12.8221 14.2556 13.5092 13.9797 14.061 13.4278C14.6129 12.876 14.8888 12.1889 14.8888 11.3667C14.8888 10.5445 14.6129 9.85746 14.061 9.30562C13.5092 8.75375 12.8221 8.47782 11.9999 8.47782C11.1777 8.47782 10.4907 8.75375 9.93882 9.30562C9.38695 9.85746 9.11102 10.5445 9.11102 11.3667C9.11102 12.1889 9.38695 12.876 9.93882 13.4278C10.4907 13.9797 11.1777 14.2556 11.9999 14.2556Z"
        fill="white" />
</g>
</svg>
</button>`;


/** This function goes through the entire length of the array Contacts and gets the initials of the saved contact. */
function getFirstLetters() {
    let allFirstLetters = [];
    for (let j = 0; j < Contacts.length; j++) {
        const element = Contacts[j];
        const firstNameLetter = element['firstName'].charAt(0);
        allFirstLetters.push(firstNameLetter);
    }
    let uniqueChars = allFirstLetters.filter((element, index) => {
        return allFirstLetters.indexOf(element) === index;
    });

    firstLetters.push(uniqueChars);

}

/**
 * This is a help function used to make the function renderContactsList cleaner and more readable. 
 * It is used to generate the HTML code that displays the contacts in the contact list that go after the letter tab separator as well as to generate that same letter tab separator. 
 * 
 * 
 * @param {string} element This parameter is the variable that is defined in a for loop and used in the other function that is calling this function. 
 *                          The value is the corresponding object from the array Contacts.
 * 
 * @param {string} firstLetter This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              The value is the first letter of the name from the person in the corresponding object from the array Contacts.
 *                              It is used to generate the letter tab separator.
 * 
 * @param {*} firstTwoLetters This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              The value is first letter of the name and surname from the person in the corresponding object from the array Contacts.
 *                              It is used to generate the name tag of the person in the contact list.  
 * 
 * @param {*} contactsList  This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              It is used to address a certain html element with the corresponding id.
 * 
 * @param {*} i This parameter is the index that corresponds to the sequence number in a for loop that runs in the function that is calling this function.
 *              It is used to generate certain elements from the same index in the array Contacts.
 */
function renderContactWithLetterSeparator(element, firstLetter, firstTwoLetters, contactsList, i) {
    contactsList.innerHTML +=
        `   <div class="frame-112" id="letter_${firstLetter}">
                        <p>${firstLetter}</p>
                    </div> 
                
                    <div class="frame-119">
                        <svg xmlns="http://www.w3.org/2000/svg" width="354" height="2" viewBox="0 0 354 2" fill="none">
                        <path d="M1 1H353" stroke="#D1D1D1" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <div class="frame_112"> 
                 
                    </div>
                    <div class="contact_name" id="contact_${[i]}" onclick="showContactDetails(${[i]})"> 
                        <div class="frame_79">
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                            <circle cx="21" cy="21" r="20.5" fill="${nameTagsColors[i]}" stroke="white"/>
                            </svg>
                            <p>${firstTwoLetters}</p>
                        </div>
                        <div type="button" class="frame_81">
                            <span id="contact_name_${[i]}">
                                ${element['firstName']} ${element['lastName']}
                            </span>
                            <a>${element['email']}</a>   
                        </div>
                    </div>
                `
}

/**
 * This is a help function used to make the function renderContactsList cleaner and more readable. 
 * It is used to generate the HTML code that displays the contacts in the contact list that go right after the first contact in a alphabetically sorted contact group. 
 * 
 * 
 * @param {string} element This parameter is the variable that is defined in a for loop and used in the other function that is calling this function. 
 *                          The value is the corresponding object from the array Contacts.
 * 
 * @param {*} firstTwoLetters This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              The value is first letter of the name and surname from the person in the corresponding object from the array Contacts.
 *                              It is used to generate the name tag of the person in the contact list.  
 * 
 * @param {*} contactsList  This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                              It is used to address a certain html element with the corresponding id.
 * 
 * @param {*} i This parameter is the index that corresponds to the sequence number in a for loop that runs in the function that is calling this function.
 *              It is used to generate certain elements from the same index in the array Contacts.
 */
function renderContactWithoutLetterSeparator(element, firstTwoLetters, contactsList, i) {
    contactsList.innerHTML += `
            <div class="frame_112"> 
                 
            </div>
            <div class="contact_name" id="contact_${[i]}" onclick="showContactDetails(${[i]})"> 
                <div class="frame_79">
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" fill="none">
                <circle cx="21" cy="21" r="20.5" fill="${nameTagsColors[i]}" stroke="white"/>
                </svg>
                <p>${firstTwoLetters}</p>
            </div>
            <div class="frame_81">
                <span id="contact_name_${[i]}">
                    ${element['firstName']} ${element['lastName']}
                </span>
                
                <a>${element['email']}</a>   
            </div>
        </div>`
}

/** This function is being used to generate and display the contacts list and all of its inside elements, including the add new contact button, letter tab separators etc..*/
async function renderContactsList() {
    await getContactsFromStorage();
    sortContactsAlphabetically(Contacts);
    let contactsList = document.getElementById('contacts_list');
    contactsList.innerHTML = "";
    contactsList.innerHTML += addNewContactButton;
    for (let i = 0; i < Contacts.length; i++) {
        let element = Contacts[i];
        let firstLetter = element['firstName'].charAt(0);
        let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
        let letterTab = document.getElementById(`letter_${firstLetter}`);
        if (!letterTab) {
            renderContactWithLetterSeparator(element, firstLetter, firstTwoLetters, contactsList, i);
        } else {
            renderContactWithoutLetterSeparator(element, firstTwoLetters, contactsList, i);
        }
    }
}

/** This function is being used for the animation of the detailed contact card. */
function animateContactCard() {
    let contactCardContainer = document.getElementById('floating_contact');
    contactCardContainer.classList.remove('floating-contact-animate');
    void contactCardContainer.offsetWidth;
    contactCardContainer.classList.add('floating-contact-animate');
}

/** This function is used for the display of the detailed contact card. */
async function showContactDetails(x) {
    await markActiveContact(x);
    let contact = document.getElementById(`contact_${[x]}`);
    let contactNameContainer = document.getElementById(`contact_name_${[x]}`);
    let contactCardContainer = document.getElementById('floating_contact');
    let element = Contacts[x];
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    contact.classList.add('background-color-2A3647', 'pointer-events-none');
    contactNameContainer.classList.add('color-FFFFFF');
    animateContactCard();
    renderContactDetails(x, element, contactCardContainer, firstTwoLetters);
    displayContact();
}

/**
 * This function is called from the showContactDetails function. It generates the HTML code that renders and displays the detailed contact card.
 * 
 * @param {number} x This parameter is the variable that is used to address certain elements and keys that correspond to the object in the array Contacts with the same index.
 *  
 * @param {string} element This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                         The value is the corresponding object from the array Contacts.
 * 
 * @param {string} contactCardContainer  This parameter is the variable that is defined and used in the other function that is calling this function. 
 *                                       It is used to address a certain html element with the corresponding id.
 * 
 * @param {string} firstTwoLetters This parameter is the variable that is defined and used in the other function that is calling this function.
 *                                 It is used to generate the first letter of the name and surname of the person in the corresponding object in the array Contacts,
 *                                 for generating the name tag.
 */
function renderContactDetails(x, element, contactCardContainer, firstTwoLetters) {
    contactCardContainer.innerHTML = "";


    contactCardContainer.innerHTML += `  
            
        <div class="frame-105">
            <div class="frame_99">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="60" fill="${nameTagsColors[x]}"/>
                </svg>
                <p>${firstTwoLetters}</p>
            </div>
            <div class="frame-104">
                <p class="frame-64">${element['firstName']} ${element['lastName']}</p>
                <div class="frame-204"> 
                    <div class="edit-contact" onclick="renderEditContact(${x})"> ${editSVG} Edit </div>
                    <div class="delete-contact" onclick="deleteContact(${x})"> ${deleteSVG} Delete </div>
                </div>   
            </div>   
        </div>
        <div class="frame-37"><span> Contact information </span></div>
        <div class="frame-101">
            <div class="frame-102"> 
                <span class="details-title">Email</span>
                <span class="details-email">${element['email']}</span>
            </div>
            <div class="frame-102"> 
                <span class="details-title">Phone</span>
                <span class="details-phone">+${element['phone']}</span>
            </div>  
        </div>
        <div class="onlymob">
        <a href="#" onclick="showContactEditMenu()" id="editcontact"><img src="assets/img/contacts/edit-contact.svg" class="default"><img src="assets/img/contacts/edit-contact-lightblue.svg" class="hover"></a>
          <div class="contact-edit" id="edit-contact" style="display:none;"> 
           <div class="edit-contact" onclick="renderEditContact(${x})"> ${editSVG} Edit </div>
           <div class="delete-contact" onclick="deleteContact(${x})"> ${deleteSVG} Delete </div>
          </div>
        </div>
            `;

}

/**
 * This function is used to mark the selected/active contact from the contacts list.
 * @param {number} x This parameter is the corresponding index number of the object in the array Contacts.
 */
async function markActiveContact(x) {
    await renderContactsList();
    let contact = await document.getElementById(`contact_${[x]}`);
    await contact.classList.add('background-color-2A3647', 'pointer-events-none');
}

/** This function is used to show the contact details in the mobile version of the webpage. */
function displayContact() {
    let displayContacts = document.getElementById('contact-page');
    displayContacts.style = "display:block; position:relative;";
}
/** This function closes the contact details and returns to the contacts list in the mobile version of the webpage */
function backToContacts() {
    let displayContacts = document.getElementById('contact-page');
    displayContacts.style = "display:none; position:relative;";
}
/** This function opens the edit contact menu in the mobile version of the webpage */
function showContactEditMenu() {
    let subMenu = document.getElementById('edit-contact');
    let editOverlay = document.getElementById('editcontactoverlay');
    if (subMenu.style.display == "none") {
        subMenu.style = "display: block;";
        editOverlay.style = "display: block;";
    }
    else {
        subMenu.style = "display: none;";
    };
}
/** This function closes the edit contact menu in the mobile version of the webpage */
function closeEditOverlay() {
    let subMenu = document.getElementById('edit-contact');
    let editOverlay = document.getElementById('editcontactoverlay');
    editOverlay.style = "display: none;";
    subMenu.style = "display: none;";
}
/**This function is used to delete a contact from the contacts list */
function deleteContact(x) {
    if (x === currentUser) {
        alert('Du kannst dich nicht selber löschen')
    } else {
        Contacts.splice(x, 1);
        if (currentUser > x && currentUser !== 1000) {
            currentUser--
            localStorage.setItem('currentUser', currentUser);
        };
        document.getElementById('floating_contact').innerHTML = '';
        saveContactsToStorage();
        renderContactsList();
    }
}

/** This function generates the HTML code used to display the add new contact overlay container.  */
function renderAddNewContact() {
    let overlayNewContact = document.getElementById('overlay_new_contact');
    overlayNewContact.classList.remove('d-none');
    overlayNewContact.innerHTML = `<div class="new-contact-main new-contact-main-animate" onclick="doNotClose(event)" id="new_contact_main">
                                        <div class="frame-194">
                                            <div class="capa2">${capa2}</div>
                                            <div class="frame-210">
                                                <div class="frame-211">Add contact</div>
                                                <div class="frame-212">Tasks are better with a team!</div>
                                                <div class="vector-5">${vector5}</div>
                                            </div>
                                        </div>

                                        <div class="frame-79">
                                            <div class="group-9">
                                                    ${group9SVG}
                                                <div class="person">${personSVG} </div>
                                            </div>
                                        </div>
                                        
                                        <div class="frame-215">
                                        <p id="messageExistingContact" style="display: none;">This contact already exists. Please use other e-mail address!</p>
                                        <form  onsubmit="createNewContact(); return false;">
                                            <div class="add-contact-text-main">
                                                <div id="name_Frame" class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="text" required id="add_contact_name" placeholder="Vor- und Nachname">
                                                        ${personSmallSVG}
                                                    </div>
                                                </div>
                                                <div id="name_Alert"></div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="email" required id="add_contact_email" placeholder="Email">
                                                        ${emailSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="tel" id="add_contact_phone" placeholder="Phone" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))">
                                                        ${phoneSmallSVG}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="add-contact-buttons-main">                                                
                                                    <div class="add-contact-cancel" onclick="closeNewContact()">
                                                        <span>Cancel</span> 
                                                        ${xSmallSVG}
                                                    </div>
                                                    <button type="submit" class="add-contact-create"> 
                                                        <span>Create contact</span>
                                                        ${checkSmallSVG}
                                                    </button>
                                                
                                            </div>
                                            </form>
                                        </div>
    
                                    </div>`;

}

/** This function closes the add new contact overlay without saving the changes anywhere. */
function closeNewContact() {
    let newContactOverlayDiv = document.getElementById('overlay_new_contact');
    let newContactMainDiv = document.getElementById('new_contact_main');
    newContactMainDiv.classList.add('close-new-contact-animate');

    setTimeout(() => {
        void newContactOverlayDiv.offsetWidth;
        newContactOverlayDiv.classList.add('d-none');
        newContactMainDiv.classList.remove('close-new-contact-animate')
    }, "220");

}

/** This is a generic all-purpose function that is used to stop the propagation of a certain function  */
function doNotClose(event) {
    event.stopPropagation();
}

/** This function gets all values from the input fields and does certain checks before saving the new contact in the Contacts array*/
async function createNewContact() {
    let nameInput = document.getElementById('add_contact_name').value;
    if (checkTwoWords(nameInput)) {
        let nameArray = nameInput.split(' ');
        let firstName = nameArray[0];
        let lastName = nameArray[1];
        let emailInput = document.getElementById('add_contact_email').value;
        let phoneInput = document.getElementById('add_contact_phone').value;
        let firstTwoLetters = firstName.charAt(0) + lastName.charAt(0);
        let newContact = {
            "firstName": firstName,
            "lastName": lastName,
            "phone": phoneInput,
            "email": emailInput,
            "color": "black",
            "firstLetters": firstTwoLetters,
            "name": nameInput,
            "password": '1234',
        };
        let alreadyUser = 0;
        for (let m = 0; m < Contacts.length; m++) {
            if (Contacts[m]["email"] == emailInput) {
                document.getElementById('messageExistingContact').style.display = 'block';
                alreadyUser = 1;
                break;
            } else { break }
        }
        if (alreadyUser != 1) {
            Contacts.push(newContact);
            sortContactsAlphabetically(Contacts);
            await saveContactsToStorage();
            let theIndex = Contacts.findIndex(x => x.email === emailInput);
            console.log(theIndex);

            closeNewContact();
            await renderContactsList();
            let theNewId = findContactIdByEmail(Contacts, emailInput);
            target = document.getElementById(`contact_${theNewId}`);
            setTimeout(() => {
                scrollToNewContact('contacts_list', `contact_${theNewId}`);
                setTimeout(() => {
                    target.click();
                }, "550");
            }, "550");
        }
    }
}

/**
 * Check if the input field contains 2 words
 * @param {string} nameInput 
 * @returns {boolean}
 */
function checkTwoWords(nameInput) {
    let words = nameInput.trim().split(' ');
    if (words.length !== 2) {
        name_Alert.textContent = "Bitte Vor- und Nachname eingeben";
        name_Frame.classList.add('redBorder');
        setTimeout(() => { name_Alert.textContent = ""; name_Frame.classList.remove('redBorder'); }, 3000)
        return false;
    } else {
        return true;
    }
}

/** This function goes sorts the entries in the array contacts alphabetically. It is usualy called from other functions before displaying the contacts list. */
function sortContactsAlphabetically(contacts) {
    contacts.sort((a, b) => {
        const nameA = a.firstName.toLowerCase();
        const nameB = b.firstName.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

/**This function is used to delete the current user. */
function deleteCurrentUser() {
    let position = Contacts.findIndex(contact => contact.firstName === 'Guest');
    Contacts.splice(position, 1);
    if (currentUser !== 0) {
        let user = Contacts.findIndex(contact => contact.firstName === Contacts[currentUser - 1].firstName);
        Contacts.splice(user, 1);
    }
}

/** This function goes through the entire array Contacts and finds the correspondig object id by comparing the email address against the entries in the array */
function findContactIdByEmail(contacts, emailToBeFound) {
    for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].email === emailToBeFound) {
            return i;
        }
    }
    return -1;
}

/**This function is used to scroll to the corresponding container id in the contacts list */
function scrollToNewContact(parentId, childId) {
    const parentElement = document.getElementById(parentId);
    const childElement = document.getElementById(childId);

    if (parentElement && childElement) {
        childElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    }
}

/** This function generates the HTML code that is used to display the edit contact overlay container */
function renderEditContact(x) {
    let element = Contacts[x];
    let firstTwoLetters = element['firstName'].charAt(0) + element['lastName'].charAt(0);
    let overlayNewContact = document.getElementById('overlay_new_contact');
    overlayNewContact.classList.remove('d-none');
    overlayNewContact.innerHTML = `<div class="new-contact-main new-contact-main-animate" onclick="doNotClose(event)" id="new_contact_main">
                                        <div class="frame-194">
                                            <div class="capa2">${capa2}</div>
                                            <div class="frame-210">
                                                <div class="frame-211">Edit contact</div>
                                                <div class="vector-5">${vector5}</div>
                                            </div>
                                        </div>

                                        <div class="frame-79">
                                            <div class="group-9">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                                            <circle cx="60" cy="60" r="60" fill="${nameTagsColors[x]}"/>
                                            </svg>
                                            <p>${firstTwoLetters}</p>
                                            </div>
                                        </div>
                                        
                                        <div class="frame-215">
                                        <form  onsubmit="editContact(${x}); return false;">
                                            <div class="add-contact-text-main">
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="text" id="edit_name" required placeholder="Name">
                                                        ${personSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="email" id="edit_email" required placeholder="Email">
                                                        ${emailSmallSVG}
                                                    </div>
                                                </div>
                                                <div class="frame-14"> 
                                                    <div class="frame-157">
                                                        <input type="tel" id="edit_phone" placeholder="Phone" onkeypress="return (event.charCode !=8 && event.charCode ==0 || (event.charCode >= 48 && event.charCode <= 57))">
                                                        ${phoneSmallSVG}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="add-contact-buttons-main">                                                
                                                    <div class="add-contact-cancel" onclick="deleteContactFromEdit(${x})">
                                                        <span>Delete</span> 
                                                    </div>
                                                    <button type="submit" class="add-contact-create"> 
                                                        <span> Save </span>
                                                        ${checkSmallSVG}
                                                    </button>
                                                
                                            </div>
                                            </form>
                                        </div>
    
                                    </div>`;

    document.getElementById('edit_name').value = element['firstName'] + " " + element['lastName'];
    document.getElementById('edit_email').value = element['email'];
    document.getElementById('edit_phone').value = element['phone'];
    let subMenu = document.getElementById('edit-contact');
    subMenu.style = "display: none;";

}

/** This function deletes a contact from the array Contacts with the corresponding object id that is transferred as the "x" parameter */
async function deleteContactFromEdit(x) {
    deleteContact(x);
    closeNewContact();
    await saveContactsToStorage();
    renderContactsList();
}

/**This function gets all the needed input values from the edit contact overlay container, and saves the changes to the correspondig object in the array Container  */
function editContact(x) {
    let nameInput = document.getElementById('edit_name').value;
    let nameArray = nameInput.split(' ');
    let newFirstName = nameArray[0];
    let newLastName = nameArray[1];
    let newEmail = document.getElementById('edit_email').value;
    let newPhone = document.getElementById('edit_phone').value;
    let element = Contacts[x];

    element.firstName = newFirstName;
    element.lastName = newLastName;
    element.email = newEmail;
    element.phone = newPhone;
    element.name = nameInput;
    saveContactsToStorage();
    closeNewContact();
    renderContactsList();
    document.getElementById('floating_contact').innerHTML = "";
    showContactDetails(x)


}