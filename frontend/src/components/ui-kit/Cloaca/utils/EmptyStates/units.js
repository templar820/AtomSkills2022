import React from 'react';
import styled from '@emotion/styled';
import applyEmotionStyle from 'lib-root/utils/applyEmotionStyle';

const StyledEmptyStates = styled.div`
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    min-height: 32px;
    margin: 0 auto;
    text-align: center;
    ${({ customStyles, ...restProps }) => applyEmotionStyle(customStyles, restProps)};
`;

const StyledImageBox = styled.div`
    min-height: 32px;
    margin: 0 auto 14px auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
    width: 100%;
    max-width: 116px;

    ${({ isSingleImage }) => isSingleImage && 'margin-bottom: 0'};
`;

const StyledHeader = styled.div`
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    max-width: 260px;
    margin: 0 auto 14px auto;

    ${({ withoutText }) => withoutText && 'margin-bottom: 0'};
`;

const StyledText = styled.div`
    font-size: 12px;
    line-height: 14px;
    max-width: 260px;
    margin: 0 auto;
`;

const StyledGreenCircle = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 32px;
    background: ${({ colors }) => colors.primary};
`;

const ExtraIcon = ({ iconScheme, colors }) => {
    if (iconScheme === 'net') {
        return (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)">
                    <path
                        d="M32 16.0059C31.9991 13.4992 31.4217 11.1252 30.3949 9.00959C29.1059 9.07195 27.836 9.19163 26.5909 9.35843C26.339 10.4344 25.4233 11.2556 24.3015 11.3591C24.0505 12.5153 23.7618 13.7497 23.4289 15.0497C25.7266 17.9088 27.9319 21.1104 29.5842 24.458C29.2405 25.0089 28.8642 25.5374 28.458 26.0407C27.0215 22.9225 25.0485 19.8958 22.8814 17.0989C21.6289 21.5984 19.8689 26.7206 17.4106 31.9387C16.9458 31.9793 16.4753 32 16 32C15.1099 32 14.2367 31.9273 13.3861 31.7875C10.7578 29.3685 8.69193 26.8014 7.07189 24.3178C6.98331 24.3353 6.89303 24.3479 6.8016 24.3562C6.54172 26.4678 6.45283 28.0694 6.42319 28.8186C5.85035 28.3899 5.30721 27.9237 4.79739 27.4237C4.85828 26.5252 4.96237 25.336 5.13966 23.938C4.43371 23.471 3.96617 22.6697 3.96617 21.7598C3.96617 21.0932 4.21886 20.4862 4.63029 20.0247C4.24549 19.2412 3.90411 18.4833 3.6024 17.7605C2.0963 18.6686 1.01609 19.4041 0.45412 19.8006C0.307916 19.2005 0.195555 18.5871 0.119173 17.9626C0.793889 17.5044 1.75621 16.8772 2.97143 16.1524C2.04686 13.6392 1.51806 11.457 1.21909 9.86947C0.434989 11.7608 0.000779073 13.8334 1.04738e-06 16.0059L0 16C0 12.7995 0.939733 9.81839 2.55833 7.31769C2.64868 8.23172 3.0398 11.3282 4.46297 15.2886C5.32606 14.8032 6.27886 14.2917 7.31451 13.7705C8.05703 11.3981 9.03874 8.87776 10.3347 6.44889C9.80011 5.97075 9.46114 5.27709 9.46114 4.50388C9.46114 4.18669 9.5208 3.88383 9.62469 3.6024C8.86602 2.97228 8.26984 2.49812 7.89241 2.20331C8.42791 1.88795 8.98338 1.60287 9.55647 1.35044C9.87933 1.60821 10.2656 1.92154 10.7032 2.28399C11.0991 2.03936 11.5634 1.8956 12.0616 1.8956C12.4341 1.8956 12.7877 1.97596 13.1083 2.11811C13.6634 1.39676 14.2554 0.700248 14.8887 0.0379888C15.2559 0.0128012 15.6265 0 16 0C16.4438 0 16.8834 0.0180693 17.3181 0.0535123C16.2228 1.03258 15.2384 2.1198 14.3562 3.27947C14.551 3.64493 14.6621 4.06162 14.6621 4.504C14.6621 4.87496 14.5834 5.22723 14.4437 5.54694C15.2806 6.31396 16.1674 7.15251 17.0811 8.05457C17.5058 8.47391 17.9454 8.91651 18.395 9.37895C19.3903 9.08846 20.4169 8.81747 21.4705 8.57226C21.5562 7.39244 22.4254 6.42802 23.559 6.20449C23.8697 4.30207 24.0318 2.91392 24.1052 2.20189C24.6562 2.52627 25.1861 2.88272 25.6923 3.26867C25.5976 4.05293 25.4526 5.12658 25.2385 6.43995C25.755 6.70441 26.1711 7.13647 26.4169 7.6647C27.4189 7.53145 28.4369 7.42774 29.4679 7.35839C31.0704 9.85071 32 12.8168 32 16L32 16.0059ZM13.2864 6.80391C12.9211 7.00051 12.5043 7.11251 12.0616 7.11251C12.0242 7.11251 11.9875 7.10998 11.9508 7.10745C11.9368 7.10649 11.9229 7.10553 11.9089 7.10471C10.9072 8.95996 10.0962 10.8799 9.44183 12.7445C11.4819 11.8035 13.8858 10.8191 16.556 9.94742C15.4162 8.79878 14.3113 7.74506 13.2864 6.80391ZM5.98069 18.9192C6.06777 18.5029 6.1608 18.0799 6.26034 17.6509C6.3824 17.1251 6.51703 16.581 6.66446 16.0236C6.10594 16.3213 5.57863 16.6128 5.08171 16.895C5.3472 17.5415 5.64514 18.2181 5.98069 18.9192ZM9.16709 21.7598C9.16709 22.4076 8.92903 22.9997 8.53783 23.4562C10.3153 26.1682 12.6505 28.9821 15.7072 31.5682C18.4315 25.8566 20.2994 20.2492 21.5698 15.4607C20.3582 13.9936 19.1101 12.6029 17.8801 11.3102C14.4794 12.3679 11.4865 13.6344 9.10434 14.7844C8.97543 14.8467 8.8488 14.9088 8.72217 14.9709C8.40949 16.0251 8.144 17.0439 7.92126 18.0012C7.81291 18.4666 7.71257 18.9255 7.6192 19.3767C8.52971 19.7829 9.16709 20.6974 9.16709 21.7598ZM21.9042 10.2181C21.1621 10.3901 20.4333 10.5755 19.7198 10.7718C20.4968 11.6069 21.2917 12.4951 22.0864 13.4281C22.2955 12.5683 22.4843 11.7421 22.655 10.9537C22.3582 10.7613 22.1016 10.5118 21.9042 10.2181Z"
                        fill={colors.primary}
                    />
                    <circle opacity="0.4" cx="24" cy="9" r="5" fill={colors.secondary} />
                    <circle opacity="0.6" cx="24" cy="9" r="4" fill={colors.secondary} />
                    <circle cx="24" cy="9" r="3" fill={colors.secondary} />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="32" height="32" fill={colors.GrayScale_0} />
                    </clipPath>
                </defs>
            </svg>
        );
    }
    //return 'dantelion' by default
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="none" />
            <rect width="12354" height="7553" transform="translate(-4540 -6026)" fill="none" />
            <rect width="1360" height="1216" transform="translate(-256 -100)" fill="none" />
            <path
                d="M13.2881 17.3558H15.4576V18.4405H14.3728V19.5253H17.6271V18.4405H16.5423V17.3558H18.7118V14.1016H13.2881V17.3558Z"
                fill={colors.primary}
            />
            <path
                d="M31.7289 17.3558V14.1016H26.3052V17.3558H28.4747V18.4405H27.3899V19.5253H30.6442V18.4405H29.5594V17.3558H31.7289Z"
                fill={colors.primary}
            />
            <path
                d="M3.52539 27.1185H5.69488V28.2032H4.61014V29.288H7.86437V28.2032H6.77963V27.1185H8.94912V23.8643H3.52539V27.1185Z"
                fill={colors.primary}
            />
            <path
                d="M23.0508 27.1185H25.2203V28.2032H24.1355V29.288H27.3898V28.2032H26.305V27.1185H28.4745V23.8643H23.0508V27.1185Z"
                fill={colors.primary}
            />
            <path
                d="M13.2881 3.25424H15.4576V4.33898H14.3728V5.42373H17.6271V4.33898H16.5423V3.25424H18.7118V0H13.2881V3.25424Z"
                fill={colors.primary}
            />
            <path
                d="M13.2881 29.8304H15.4576V30.9152H14.3728V31.9999H17.6271V30.9152H16.5423V29.8304H18.7118V26.5762H13.2881V29.8304Z"
                fill={colors.primary}
            />
            <path
                d="M16.5423 11.932V7.05067C16.5423 6.75115 16.2994 6.5083 15.9999 6.5083C15.7004 6.5083 15.4575 6.75115 15.4575 7.05067V11.932C15.4575 12.2316 15.7004 12.4744 15.9999 12.4744C16.2994 12.4744 16.5423 12.2316 16.5423 11.932Z"
                fill={colors.primary}
            />
            <path
                d="M16.5423 24.407V21.1527C16.5423 20.8532 16.2994 20.6104 15.9999 20.6104C15.7004 20.6104 15.4575 20.8532 15.4575 21.1527V24.407C15.4575 24.7065 15.7004 24.9493 15.9999 24.9493C16.2994 24.9493 16.5423 24.7065 16.5423 24.407Z"
                fill={colors.primary}
            />
            <path
                d="M20.8812 15.1865C20.5817 15.1865 20.3389 15.4294 20.3389 15.7289C20.3389 16.0284 20.5817 16.2713 20.8812 16.2713H24.1355C24.435 16.2713 24.6778 16.0284 24.6778 15.7289C24.6778 15.4294 24.435 15.1865 24.1355 15.1865H20.8812Z"
                fill={colors.primary}
            />
            <path
                d="M7.32227 15.7289C7.32227 16.0284 7.56512 16.2713 7.86464 16.2713H11.1189C11.4184 16.2713 11.6612 16.0284 11.6612 15.7289C11.6612 15.4294 11.4184 15.1865 11.1189 15.1865H7.86464C7.56512 15.1865 7.32227 15.4294 7.32227 15.7289Z"
                fill={colors.primary}
            />
            <path
                d="M19.7967 12.4746C19.9405 12.4746 20.0785 12.4174 20.1802 12.3157L22.3497 10.1462C22.5552 9.93331 22.5523 9.59512 22.343 9.3859C22.1338 9.17669 21.7956 9.17377 21.5827 9.37928L19.4132 11.5488C19.2583 11.704 19.2117 11.9373 19.2957 12.1399C19.3796 12.3425 19.5774 12.4746 19.7967 12.4746Z"
                fill={colors.primary}
            />
            <path
                d="M10.4172 9.37928C10.2043 9.17377 9.86612 9.17669 9.6569 9.3859C9.44768 9.59512 9.44477 9.93331 9.65028 10.1462L11.8198 12.3157C12.0327 12.5212 12.3709 12.5183 12.5801 12.3091C12.7893 12.0999 12.7922 11.7617 12.5867 11.5488L10.4172 9.37928Z"
                fill={colors.primary}
            />
            <path
                d="M11.8199 19.142L9.6504 21.3115C9.50951 21.4476 9.45283 21.6494 9.50262 21.839C9.55214 22.0286 9.70019 22.1767 9.8898 22.2262C10.0794 22.276 10.2812 22.2193 10.4173 22.0784L12.5868 19.9089C12.7923 19.696 12.7894 19.3578 12.5802 19.1486C12.371 18.9394 12.0328 18.9365 11.8199 19.142Z"
                fill={colors.primary}
            />
            <path
                d="M20.1799 19.142C19.967 18.9365 19.6288 18.9394 19.4196 19.1486C19.2104 19.3578 19.2075 19.696 19.413 19.9089L21.5825 22.0784C21.7954 22.2839 22.1336 22.281 22.3428 22.0718C22.552 21.8626 22.5549 21.5244 22.3494 21.3115L20.1799 19.142Z"
                fill={colors.primary}
            />
            <path
                d="M5.69488 8.67785H4.61014V9.7626H7.86437V8.67785H6.77963V7.5931H8.94912V4.33887H3.52539V7.5931H5.69488V8.67785Z"
                fill={colors.secondary}
            />
            <path
                d="M25.2203 8.67785H24.1355V9.7626H27.3898V8.67785H26.305V7.5931H28.4745V4.33887H23.0508V7.5931H25.2203V8.67785Z"
                fill={colors.primary}
            />
            <path
                d="M1.35574 18.4405V19.5253H4.60998V18.4405H3.52523V17.3558H5.69473V14.1016H0.270996V17.3558H2.44049V18.4405H1.35574Z"
                fill={colors.primary}
            />
        </svg>
    );
};

export { StyledEmptyStates, StyledImageBox, StyledHeader, StyledText, StyledGreenCircle, ExtraIcon };