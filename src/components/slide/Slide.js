import React, { Component } from 'react';
import "./Slide.css"
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

const items = [
    {
        src: '/images/code4.jpg',
        altText: 'Challenge',
        caption: "Challenge your limits, don't limit your challenges"
      },
      {
        src: '/images/code5.png',
        altText: 'Challenge',
        caption: "Challenge your limits, don't limit your challenges"
      },
    {
    src: '/images/code3.jpg',
    altText: 'Challenge',
    caption: "Challenge your limits, don't limit your challenges"
  },
  {
    src: '/images/code.jpg',
    altText: 'Challenge',
    caption: "Challenge your limits, don't limit your challenges"

  },
];

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 }
  }

  onExiting=()=> {
    this.animating = true;
  }

  onExited=()=> {
    this.animating = false;
  }

  next=()=> {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous=()=> {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex=(newIndex)=> {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} style={{width: "100%",maxHeight: "300px"}} />
          <CarouselCaption captionHeader={item.caption} />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >

        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}


export default Slide;