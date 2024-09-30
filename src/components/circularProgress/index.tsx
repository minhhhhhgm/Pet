// import MText from 'components/text';
// import { View } from 'react-native';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import { Circle } from 'react-native-svg';
// import { ProgressContentType, ProgressSize } from 'types/circularProgress.type';
// import colors from 'utils/colors';
// import { CarIcon, CarIconChecked } from 'utils/icons';
// import { useAppTranslation } from 'utils/languages';

// type CircularProgressProps = {
//   contentType: ProgressContentType;
//   progress: number;
//   size: ProgressSize;
// };

// export default function CircularProgress({ contentType, progress, size }: CircularProgressProps) {
//   const translate = useAppTranslation('common');

//   return (
//     <View style={{ alignItems: 'center' }}>
//       <AnimatedCircularProgress
//         size={size === ProgressSize.Big ? 250 : 180}
//         width={size === ProgressSize.Big ? 20 : 10}
//         fill={progress}
//         fillLineCap="round"
//         tintColor={colors.primary}
//         backgroundColor={colors.gray[50]}
//         padding={10}
//         rotation={360}
//         renderCap={({ center }) => {
//           if (size === ProgressSize.Big)
//             return <Circle cx={center.x} cy={center.y} r={10} fill={colors.primary} />;
//           else return;
//         }}
//         children={fill => (
//           <>
//             {contentType === ProgressContentType.Icon && progress === 100 && (
//               <CarIconChecked width={70} height={70} />
//             )}
//             {contentType === ProgressContentType.Icon && !(progress === 100) && (
//               <CarIcon width={70} height={70} />
//             )}
//             {contentType === ProgressContentType.Percentage && (
//               <>
//                 <MText fontSize={16}>{translate('common:progress')}</MText>
//                 <MText color={colors.primary} fontSize={40} fontWeight="700">
//                   {Math.round(fill)}
//                   <MText color={colors.primary} fontSize={20}>
//                     %
//                   </MText>
//                 </MText>
//               </>
//             )}
//           </>
//         )}
//       />
//     </View>
//   );
// }
