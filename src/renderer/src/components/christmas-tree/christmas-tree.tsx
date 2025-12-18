import { TreeContainer, Trunk, Branch, GarlandLight, Star } from './styled'

export const ChristmasTree = () => {
  return (
    <TreeContainer>
      <Star />
      <Branch size={160} top={20} zIndex={4} />
      <Branch size={140} top={70} zIndex={3} />
      <Branch size={120} top={120} zIndex={2} />
      <Branch size={100} top={170} zIndex={1} />

      <GarlandLight top={40} left={80} colorIndex={0} />
      <GarlandLight top={50} left={120} colorIndex={1} />
      <GarlandLight top={90} left={60} colorIndex={2} />
      <GarlandLight top={100} left={140} colorIndex={3} />
      <GarlandLight top={140} left={90} colorIndex={4} />
      <GarlandLight top={150} left={110} colorIndex={5} />
      <GarlandLight top={190} left={70} colorIndex={0} />
      <GarlandLight top={200} left={130} colorIndex={1} />

      <Trunk />
    </TreeContainer>
  )
}
