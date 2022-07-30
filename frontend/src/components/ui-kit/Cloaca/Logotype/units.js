import React from 'react';
import { px } from 'lib-root/utils/units';

const logos = (fontSize) => {
    return {
        primary: (
            <svg width={px(fontSize, 24.5)} height={px(fontSize, 4.4375)} viewBox="0 0 392 71" fill="none">
                <path
                    fillRule="evenodd"
                    d="M382.533 20.0441V33.1524H364.948V20.0441H356.295V54.6908H364.948V40.7024H382.533V54.6908H391.232V20.0441H382.533ZM231.076 19.2567C233.853 19.2567 236.768 20.7852 238.202 23.9349L252.362 54.6908H243.154L240.053 47.3724H222.099L218.998 54.6908H209.79L223.95 23.9349C225.384 20.7852 228.3 19.2567 231.076 19.2567ZM230.382 27.872L225.06 40.4245H237.092L231.77 27.872C231.631 27.4552 231.307 27.3625 231.076 27.3625C230.845 27.3625 230.567 27.5015 230.382 27.872ZM135.056 13.7911C130.984 13.7911 128.393 15.9681 126.496 20.322L115.205 46.3533L103.914 20.322C102.016 15.9681 99.4251 13.7911 95.3529 13.7911C91.5584 13.7911 87.6251 16.5239 87.6251 22.4064V54.6908H96.2784V23.3328L107.662 49.1788C109.189 52.7917 111.642 55.0613 115.205 55.0613C118.768 55.0613 121.22 52.7917 122.747 49.1788L134.131 23.3328V54.6908H142.784V22.4527C142.784 16.5239 138.851 13.7911 135.056 13.7911ZM157.962 47.3723C157.546 47.3723 157.222 47.0481 157.222 46.6312V40.4708H178.832V33.384H157.222V28.1036C157.222 27.6868 157.546 27.3625 157.962 27.3625H179.341V20.0441H153.705C150.697 20.0441 148.569 22.5454 148.569 25.1855V49.4567C148.569 52.0969 150.744 54.5981 153.705 54.5981H179.341V47.2797H157.962V47.3723ZM194.056 54.6908V28.15C194.056 27.7331 194.38 27.4089 194.797 27.4089H216.176V20.0905H190.54C187.532 20.0905 185.403 22.5917 185.403 25.2319V54.6908H194.056ZM332.232 19.5346C345.328 19.5346 350.557 25.1856 350.557 37.3211C350.557 49.2715 345.235 55.015 332.14 55.015H329.271C316.175 55.015 310.853 49.2715 310.853 37.3211C310.853 25.1856 316.036 19.5346 329.178 19.5346H332.232ZM329.317 47.8356H332.093C339.266 47.8356 342.135 44.5932 342.135 37.3212V37.2748C342.135 30.2343 339.451 26.7604 332.093 26.7604H329.317C321.728 26.7604 319.275 30.2343 319.275 37.2748V37.3212C319.275 44.5932 322.098 47.8356 329.317 47.8356ZM0.721573 35.7C0.721573 16.5239 16.2698 0.960693 35.4275 0.960693H35.52V35.3294C35.52 35.561 35.3349 35.7 35.1498 35.7H32.2345H30.8C29.3192 35.7463 28.1161 36.9969 28.0698 38.4791V69.6518C12.429 66.2705 0.721573 52.3748 0.721573 35.7ZM24.4141 25.2319C24.4141 27.6404 26.3577 29.5858 28.7639 29.5858C31.1702 29.5858 33.1137 27.6404 33.1137 25.2319C33.1137 22.8233 31.1702 20.8779 28.7639 20.8779C26.3577 20.8779 24.4141 22.8233 24.4141 25.2319ZM269.53 14.6248H286.698C299.47 14.6248 304.606 21.1095 304.653 32.4113C304.653 34.1714 304.514 35.7926 304.282 37.3211C302.94 45.3343 298.22 50.2441 286.235 50.2441H282.487V54.6908H273.834V50.2441H270.039C258.054 50.2441 253.334 45.3343 251.992 37.3211C251.715 35.7926 251.622 34.1714 251.622 32.4113C251.622 21.1095 256.712 14.6248 269.53 14.6248ZM273.787 42.9257H269.808C263.931 42.9257 261.849 40.7487 260.553 37.3211C260.044 35.9779 260.044 34.3104 260.044 32.4113C260.044 25.0466 263.468 21.8969 268.466 21.8969H273.787V42.9257ZM295.675 37.3211C294.38 40.7487 292.251 42.9257 286.42 42.9257H282.441V21.8969H287.762C292.76 21.8969 296.184 25.0003 296.184 32.4113C296.184 34.3104 296.184 35.9779 295.675 37.3211ZM39.731 37.0432V1.2386C56.8526 3.32296 70.1333 17.9598 70.1796 35.6536C70.1796 54.8297 54.6314 70.3929 35.4737 70.3929C34.4094 70.3929 33.3451 70.3466 32.2808 70.2539V40.2392C32.2808 40.0539 32.4196 39.8687 32.651 39.8687H36.9082C38.4353 39.8687 39.731 38.6181 39.731 37.0432ZM38.9906 54.6445C36.5843 54.6445 34.6408 52.6991 34.6408 50.2905C34.6408 47.8819 36.5843 45.9365 38.9906 45.9365C41.3969 45.9365 43.3404 47.8819 43.3404 50.2905C43.3404 52.6991 41.3969 54.6445 38.9906 54.6445ZM44.8212 50.2905C44.8212 52.6991 46.7647 54.6445 49.171 54.6445C51.5773 54.6445 53.5208 52.6991 53.5208 50.2905C53.5208 47.8819 51.5773 45.9365 49.171 45.9365C46.7647 45.9365 44.8212 47.8819 44.8212 50.2905ZM55.0016 50.2905C55.0016 52.6991 56.9451 54.6445 59.3514 54.6445C61.7577 54.6445 63.7012 52.6991 63.7012 50.2905C63.7012 47.8819 61.7577 45.9365 59.3514 45.9365C56.9451 45.9365 55.0016 47.8819 55.0016 50.2905Z"
                    fill="currentColor"
                />
            </svg>
        ),
        secondary: (
            <svg width={px(fontSize, 4.4375)} height={px(fontSize, 4.4375)} viewBox="0 0 71 71">
                <path
                    fillRule="evenodd"
                    d="M39.8077 36.8432V1.03864C56.9457 3.12299 70.2393 17.7598 70.2856 35.4537C70.2856 54.6297 54.7224 70.1929 35.5464 70.1929C34.481 70.1929 33.4157 70.1466 32.3503 70.054V40.0392C32.3503 39.854 32.4893 39.6687 32.7209 39.6687H36.9822C38.5108 39.6687 39.8077 38.4181 39.8077 36.8432ZM39.0666 54.4445C36.658 54.4445 34.7126 52.4991 34.7126 50.0905C34.7126 47.6819 36.658 45.7365 39.0666 45.7365C41.4752 45.7365 43.4206 47.6819 43.4206 50.0905C43.4206 52.4991 41.4752 54.4445 39.0666 54.4445ZM44.9028 50.0905C44.9028 52.4991 46.8482 54.4445 49.2568 54.4445C51.6654 54.4445 53.6108 52.4991 53.6108 50.0905C53.6108 47.6819 51.6654 45.7365 49.2568 45.7365C46.8482 45.7365 44.9028 47.6819 44.9028 50.0905ZM55.093 50.0905C55.093 52.4991 57.0384 54.4445 59.447 54.4445C61.8556 54.4445 63.801 52.4991 63.801 50.0905C63.801 47.6819 61.8556 45.7365 59.447 45.7365C57.0384 45.7365 55.093 47.6819 55.093 50.0905ZM0.760742 35.5C0.760742 16.3239 16.3239 0.760742 35.5 0.760742H35.5927V35.1294C35.5927 35.361 35.4074 35.5 35.2221 35.5H32.304H30.8681C29.3859 35.5463 28.1816 36.7969 28.1353 38.2791V69.4518C12.4795 66.0705 0.760742 52.1748 0.760742 35.5ZM24.4761 25.0319C24.4761 27.4405 26.4215 29.3859 28.8301 29.3859C31.2387 29.3859 33.1841 27.4405 33.1841 25.0319C33.1841 22.6233 31.2387 20.6779 28.8301 20.6779C26.4215 20.6779 24.4761 22.6233 24.4761 25.0319Z"
                    fill="currentColor"
                />
            </svg>
        ),
        iot: (
            <svg
                width={px(fontSize, 4.9375)}
                height={px(fontSize, 4.3125)}
                viewBox="0 0 79 69"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M51.8129 28.1239C51.3701 28.1239 50.9373 27.9926 50.5692 27.7465C50.201 27.5004 49.9142 27.1507 49.7448 26.7415C49.5755 26.3324 49.5314 25.8822 49.618 25.448C49.7046 25.0137 49.918 24.6149 50.2314 24.302C50.5447 23.9891 50.9438 23.7762 51.3781 23.6902C51.8125 23.6041 52.2626 23.6489 52.6715 23.8187C53.0805 23.9886 53.4298 24.2759 53.6754 24.6444C53.921 25.0129 54.0517 25.4459 54.0511 25.8887C54.0511 26.1825 53.9932 26.4734 53.8807 26.7448C53.7682 27.0161 53.6033 27.2627 53.3954 27.4703C53.1875 27.6779 52.9408 27.8425 52.6692 27.9546C52.3977 28.0668 52.1067 28.1243 51.8129 28.1239ZM46.5666 28.1239C46.1238 28.1239 45.691 27.9926 45.3228 27.7465C44.9547 27.5004 44.6678 27.1507 44.4985 26.7415C44.3292 26.3324 44.2851 25.8822 44.3717 25.448C44.4583 25.0137 44.6717 24.6149 44.985 24.302C45.2984 23.9891 45.6974 23.7762 46.1318 23.6902C46.5662 23.6041 47.0163 23.6489 47.4252 23.8187C47.8341 23.9886 48.1835 24.2759 48.4291 24.6444C48.6746 25.0129 48.8054 25.4459 48.8048 25.8887C48.8048 26.1825 48.7469 26.4734 48.6344 26.7448C48.5219 27.0161 48.357 27.2627 48.1491 27.4703C47.9412 27.6779 47.6944 27.8425 47.4229 27.9546C47.1514 28.0668 46.8604 28.1243 46.5666 28.1239ZM41.3173 28.1239C40.8745 28.1239 40.4417 27.9926 40.0735 27.7465C39.7054 27.5004 39.4185 27.1507 39.2492 26.7415C39.0799 26.3324 39.0357 25.8822 39.1223 25.448C39.2089 25.0137 39.4224 24.6149 39.7357 24.302C40.049 23.9891 40.4481 23.7762 40.8825 23.6902C41.3169 23.6041 41.767 23.6489 42.1759 23.8187C42.5848 23.9886 42.9342 24.2759 43.1798 24.6444C43.4253 25.0129 43.5561 25.4459 43.5555 25.8887C43.5555 26.1825 43.4976 26.4734 43.3851 26.7448C43.2726 27.0161 43.1076 27.2627 42.8998 27.4703C42.6919 27.6779 42.4451 27.8425 42.1736 27.9546C41.9021 28.0668 41.6111 28.1243 41.3173 28.1239ZM41.6814 0.582178V19.0577C41.679 19.4429 41.5241 19.8115 41.2506 20.0828C40.9771 20.354 40.6073 20.5059 40.2221 20.5051H38.0167C37.9645 20.5051 37.9144 20.5258 37.8774 20.5628C37.8405 20.5997 37.8198 20.6498 37.8198 20.702V36.1874C38.3659 36.2351 38.915 36.2649 39.473 36.2649C44.0472 36.2902 48.4575 34.5639 51.7991 31.4402C55.1407 28.3166 57.1601 24.0325 57.443 19.4671C57.7259 14.9017 56.2509 10.4011 53.3205 6.88878C50.3901 3.3765 46.2266 1.11889 41.6844 0.579193M70.9313 62.3465C71.8573 62.3465 72.487 61.8465 72.5518 61.0224H71.8666C71.8295 61.5132 71.4406 61.7447 70.9313 61.7447C70.4313 61.7447 70.0424 61.5132 70.0053 61.0224H69.3201C69.3757 61.8465 70.0146 62.3465 70.9313 62.3465ZM72.0517 63.9114V66.8931H72.8573V62.6243H72.0517V62.9855L69.8572 65.643V62.6243H69.0516V66.8931H69.8572V66.5505L72.0517 63.9114ZM68.01 64.5133C68.01 63.3373 67.1951 62.5132 65.9821 62.5132C64.7135 62.5132 63.8802 63.3929 63.8802 64.7541C63.8802 66.1338 64.7043 67.0042 66.0192 67.0042C67.0192 67.0042 67.8063 66.4579 67.9545 65.6708H67.1488C66.9729 66.069 66.584 66.3005 66.0192 66.3005C65.2043 66.3005 64.695 65.819 64.6765 64.9948H67.9822C68.0008 64.7911 68.01 64.6985 68.01 64.5133ZM64.6765 64.3837C64.7043 63.6614 65.2228 63.1429 65.9914 63.1429C66.7507 63.1429 67.2137 63.6336 67.2137 64.3837H64.6765ZM62.8324 66.1338V62.6243H62.036V66.2171H60.2952V62.6243H59.4896V66.2171H57.758V62.6243H56.9524V66.8931H62.4527V68.0043H63.2583V66.1338H62.8324ZM55.9108 64.5133C55.9108 63.3373 55.096 62.5132 53.8829 62.5132C52.6144 62.5132 51.781 63.3929 51.781 64.7541C51.781 66.1338 52.6051 67.0042 53.92 67.0042C54.92 67.0042 55.7071 66.4579 55.8553 65.6708H55.0497C54.8737 66.069 54.4848 66.3005 53.92 66.3005C53.1051 66.3005 52.5958 65.819 52.5773 64.9948H55.8831C55.9016 64.7911 55.9108 64.6985 55.9108 64.5133ZM52.5773 64.3837C52.6051 63.6614 53.1236 63.1429 53.8922 63.1429C54.6515 63.1429 55.1145 63.6336 55.1145 64.3837H52.5773ZM49.7065 63.5781C50.4473 63.4392 50.9288 62.9669 50.9288 62.0873C50.9288 61.0409 50.1602 60.4113 48.9102 60.4113H46.7804V66.8931H49.0028C50.2436 66.8931 51.0121 66.2171 51.0121 65.1245C51.0121 64.217 50.4103 63.6614 49.7065 63.5781ZM48.8824 61.1613C49.6324 61.1613 50.0862 61.5317 50.0862 62.1984C50.0862 62.8373 49.6324 63.2355 48.938 63.2355H47.6231V61.1613H48.8824ZM48.9935 66.143H47.6231V63.9763H49.0583C49.7065 63.9763 50.1695 64.4022 50.1695 65.0411C50.1695 65.7356 49.7158 66.143 48.9935 66.143ZM43.4139 62.6243H39.9878V63.3744H41.2934V66.8931H42.099V63.3744H43.4139V62.6243ZM39.4892 64.5133C39.4892 63.3373 38.6744 62.5132 37.4614 62.5132C36.1928 62.5132 35.3594 63.3929 35.3594 64.7541C35.3594 66.1338 36.1835 67.0042 37.4984 67.0042C38.4984 67.0042 39.2855 66.4579 39.4337 65.6708H38.6281C38.4522 66.069 38.0632 66.3005 37.4984 66.3005C36.6835 66.3005 36.1743 65.819 36.1557 64.9948H39.4615C39.48 64.7911 39.4892 64.6985 39.4892 64.5133ZM36.1557 64.3837C36.1835 63.6614 36.7021 63.1429 37.4706 63.1429C38.2299 63.1429 38.6929 63.6336 38.6929 64.3837H36.1557ZM30.4753 66.8931H31.2809V65.0782H33.5125V66.8931H34.3088V62.6243H33.5125V64.4022H31.2809V62.6243H30.4753V66.8931ZM27.375 62.5132C26.6897 62.5132 26.0786 62.8466 25.8101 63.3744V62.6243H25.0045V68.8654H25.8101V66.143C26.0786 66.6708 26.6712 67.0042 27.3287 67.0042C28.5602 67.0042 29.4399 66.069 29.4399 64.7633C29.4399 63.4299 28.5972 62.5132 27.375 62.5132ZM27.2175 66.2819C26.3656 66.2819 25.773 65.6523 25.773 64.7633C25.773 63.8651 26.3656 63.2355 27.2175 63.2355C28.0417 63.2355 28.6343 63.8744 28.6343 64.7633C28.6343 65.6523 28.0417 66.2819 27.2175 66.2819ZM23.9629 64.5133C23.9629 63.3373 23.148 62.5132 21.935 62.5132C20.6664 62.5132 19.833 63.3929 19.833 64.7541C19.833 66.1338 20.6571 67.0042 21.972 67.0042C22.9721 67.0042 23.7592 66.4579 23.9073 65.6708H23.1017C22.9258 66.069 22.5369 66.3005 21.972 66.3005C21.1572 66.3005 20.6479 65.819 20.6294 64.9948H23.9351C23.9536 64.7911 23.9629 64.6985 23.9629 64.5133ZM20.6294 64.3837C20.6571 63.6614 21.1757 63.1429 21.9443 63.1429C22.7036 63.1429 23.1665 63.6336 23.1665 64.3837H20.6294ZM19.3331 62.6243H15.907V63.3744H17.2126V66.8931H18.0182V63.3744H19.3331V62.6243ZM11.0877 66.8931H11.8933V65.0782H14.1249V66.8931H14.9212V62.6243H14.1249V64.4022H11.8933V62.6243H11.0877V66.8931ZM8.80987 62.0873V66.8931H9.65251V60.4113H8.80987V60.8465L5.80045 65.2171V60.4113H4.95781V66.8931H5.80045V66.4579L8.80987 62.0873ZM54.1257 51.2519C53.7915 52.1472 53.2484 52.7023 51.7383 52.7023H50.7058V47.2829H52.0815C53.3707 47.2829 54.2511 48.0886 54.2511 49.9926C54.2801 50.4166 54.2367 50.8425 54.1227 51.2519H54.1257ZM48.4795 52.7082H47.4529C45.9399 52.7082 45.3968 52.1442 45.0655 51.2579C44.9516 50.8484 44.9082 50.4226 44.9372 49.9985C44.9372 48.0946 45.8325 47.2888 47.1068 47.2888H48.4825L48.4795 52.7082ZM51.807 45.4058H47.3813C44.0777 45.4058 42.7557 47.0799 42.7557 49.9926C42.7513 50.4162 42.7823 50.8394 42.8482 51.2579C43.1974 53.323 44.409 54.5913 47.5067 54.5913H48.4795V55.7343H50.7058V54.5913H51.6816C54.7763 54.5913 55.9879 53.323 56.3371 51.2579C56.403 50.8394 56.434 50.4162 56.4296 49.9926C56.4296 47.0799 55.1105 45.4058 51.804 45.4058M63.5381 53.9705H62.8219C60.9567 53.9705 60.2375 53.129 60.2375 51.2608C60.2375 49.4494 60.8702 48.5571 62.8219 48.5571H63.5381C65.4331 48.5571 66.1225 49.4524 66.1225 51.2608C66.1225 53.129 65.3883 53.9705 63.5381 53.9705ZM68.3129 51.2519C68.3129 48.1274 66.97 46.6711 63.5829 46.6711H62.801C59.4139 46.6711 58.0709 48.1274 58.0709 51.2519C58.0709 54.3287 59.4407 55.8118 62.8189 55.8118H63.5381C66.9163 55.8118 68.289 54.3197 68.289 51.2519H68.3129ZM27.9091 55.7283V48.8824C27.9091 48.8318 27.9292 48.7832 27.965 48.7474C28.0008 48.7115 28.0494 48.6914 28.1001 48.6914H33.615V46.8083H27.0018C26.6496 46.8091 26.312 46.9492 26.0626 47.198C25.8133 47.4468 25.6724 47.7841 25.6709 48.1363V55.7283H27.9091ZM18.6011 53.8452C18.5502 53.8445 18.5016 53.8237 18.4659 53.7874C18.4302 53.7511 18.4101 53.7022 18.4102 53.6513V52.0606H23.9847V50.2402H18.4102V48.8824C18.4102 48.8318 18.4303 48.7832 18.4661 48.7474C18.5019 48.7115 18.5505 48.6914 18.6011 48.6914H24.1131V46.8083H17.5C17.148 46.8099 16.8108 46.9502 16.5616 47.1989C16.3124 47.4475 16.1713 47.7843 16.169 48.1363V54.4033C16.1713 54.7553 16.3124 55.0922 16.5616 55.3408C16.8108 55.5894 17.148 55.7297 17.5 55.7313H24.1131V53.8482L18.6011 53.8452ZM12.6923 45.1909C11.6448 45.1909 10.9763 45.7489 10.4809 46.871L7.56234 53.5856L4.64672 46.871C4.15133 45.7489 3.48286 45.1909 2.43539 45.1909C1.45655 45.1909 0.444885 45.8922 0.444885 47.4171V55.7283H2.67711V47.635L5.61362 54.2929C6.00754 55.221 6.64021 55.8059 7.56234 55.8089C8.48448 55.8089 9.12012 55.212 9.51405 54.2929L12.4506 47.635V55.7193H14.6828V47.4171C14.6828 45.8922 13.6711 45.1909 12.6923 45.1909ZM35.9069 52.0606L37.2766 48.8287C37.2897 48.7909 37.3144 48.7583 37.347 48.7352C37.3797 48.7122 37.4187 48.7 37.4587 48.7004C37.4987 48.6996 37.538 48.7116 37.5707 48.7347C37.6035 48.7578 37.628 48.7907 37.6407 48.8287L39.0194 52.0696L35.9069 52.0606ZM39.3029 47.8021C39.1461 47.4446 38.889 47.1401 38.5627 46.9256C38.2365 46.7111 37.8551 46.5958 37.4646 46.5935C37.0745 46.5956 36.6935 46.7109 36.3677 46.9255C36.0419 47.14 35.7854 47.4446 35.6293 47.8021L31.9706 55.7283H34.358L35.1548 53.8452H39.7834L40.5802 55.7283H42.9676L39.3029 47.8021ZM76.5435 46.8083V50.1865H72.0074V46.8083H69.7692V55.7283H72.0074V52.1233H76.5435V55.7283H78.7817V46.8083H76.5435ZM36.0381 15.214C35.5955 15.214 35.1627 15.0827 34.7947 14.8368C34.4266 14.5909 34.1397 14.2413 33.9703 13.8323C33.8009 13.4234 33.7566 12.9733 33.843 12.5392C33.9293 12.105 34.1425 11.7062 34.4555 11.3932C34.7685 11.0802 35.1673 10.867 35.6015 10.7806C36.0357 10.6943 36.4857 10.7386 36.8947 10.908C37.3036 11.0774 37.6532 11.3643 37.8991 11.7323C38.1451 12.1004 38.2763 12.5331 38.2763 12.9758C38.2763 13.5694 38.0405 14.1387 37.6208 14.5585C37.201 14.9782 36.6318 15.214 36.0381 15.214ZM39.47 0.444912C35.0427 0.431018 30.7672 2.05786 27.469 5.01137C24.1708 7.96487 22.0837 12.0356 21.6108 16.4376C21.1378 20.8396 22.3125 25.2608 24.908 28.8475C27.5036 32.4342 31.3359 34.9322 35.6651 35.8591V19.7889C35.6739 19.4166 35.8241 19.0617 36.0852 18.7961C36.3463 18.5306 36.6986 18.3745 37.0707 18.3594H39.3298C39.3808 18.3595 39.4299 18.3401 39.4671 18.3051C39.5043 18.2702 39.5267 18.2223 39.5297 18.1714V0.447897L39.47 0.444912Z"
                    fill="currentColor"
                />
            </svg>
        )
    };
};

export default logos;