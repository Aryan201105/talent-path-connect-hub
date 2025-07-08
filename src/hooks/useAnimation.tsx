import anime from 'animejs';

export const useAnimations = () => {
  const animateSectionHeader = (element: HTMLElement) => {
    const title = element.querySelector('h2');
    const subtitle = element.querySelector('p');
    const link = element.querySelector('a');

    const timeline = anime.timeline();
    
    timeline
      .add({
        targets: title,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
      })
      .add({
        targets: subtitle,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutExpo'
      }, '-=600')
      .add({
        targets: link,
        translateX: [30, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutExpo'
      }, '-=400');
  };

  const animateJobCards = (refs: (HTMLElement | null)[]) => {
    anime({
      targets: refs.filter(Boolean),
      translateY: [60, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      delay: anime.stagger(150),
      easing: 'easeOutExpo'
    });
  };

  const animateSkillCards = (refs: (HTMLElement | null)[]) => {
    anime({
      targets: refs.filter(Boolean),
      translateY: [60, 0],
      opacity: [0, 1],
      rotateY: [15, 0],
      duration: 900,
      delay: anime.stagger(200),
      easing: 'easeOutExpo'
    });
  };

  const animateStats = (refs: (HTMLElement | null)[]) => {
    const numbers = refs.map(ref => ref?.querySelector('h3'));
    const icons = refs.map(ref => ref?.querySelector('.lucide'));
    const descriptions = refs.map(ref => ref?.querySelector('p'));

    const timeline = anime.timeline();
    
    timeline
      .add({
        targets: icons.filter(Boolean),
        scale: [0, 1],
        rotateY: [180, 0],
        duration: 600,
        delay: anime.stagger(150),
        easing: 'easeOutExpo'
      })
      .add({
        targets: numbers.filter(Boolean),
        scale: [0.5, 1],
        opacity: [0, 1],
        duration: 800,
        delay: anime.stagger(100),
        easing: 'easeOutBounce'
      }, '-=300')
      .add({
        targets: descriptions.filter(Boolean),
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(100),
        easing: 'easeOutExpo'
      }, '-=400');
  };

  const animateCTA = (element: HTMLElement) => {
    const title = element.querySelector('h2');
    const subtitle = element.querySelector('p');
    const buttons = element.querySelectorAll('.cta-button');

    const timeline = anime.timeline();
    
    timeline
      .add({
        targets: title,
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
      })
      .add({
        targets: subtitle,
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutExpo'
      }, '-=400')
      .add({
        targets: buttons,
        translateY: [40, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 600,
        delay: anime.stagger(150),
        easing: 'easeOutExpo'
      }, '-=300');
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.05,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      duration: 200,
      easing: 'easeOutQuad'
    });
  };

  return {
    animateSectionHeader,
    animateJobCards,
    animateSkillCards,
    animateStats,
    animateCTA,
    handleButtonHover,
    handleButtonLeave
  };
};
