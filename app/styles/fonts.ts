import localFont from 'next/font/local';


// const Campton = localFont({ 

// 	src: [

// 		{

// 			path: '../fonts/CamptonBook.woff',
// 			weight: '400',
// 			style: 'normal'
// 		},

// 		{

// 			path: '../fonts/CamptonMedium.woff',
// 			weight: '500',
// 			style: 'normal'
// 		},

// 		{

// 			path: '../fonts/CamptonSemiBold.woff',
// 			weight: '600',
// 			style: 'normal'
// 		},

// 		{

// 			path: '../fonts/CamptonBold.woff',
// 			weight: '700',
// 			style: 'normal'
// 		}
// 	],

// 	variable: '--font-campton'
// });

const camptonBook = localFont({src: '../fonts/CamptonBook.woff' });
const camptonMedium = localFont({src: '../fonts/CamptonMedium.woff' });
const camptonSemiBold = localFont({src: '../fonts/CamptonSemiBold.woff' });
const camptonBold = localFont({src: '../fonts/CamptonBold.woff' });

export { camptonBook, camptonMedium, camptonSemiBold, camptonBold };