import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-slide-image',
  templateUrl: './slide-image.component.html',
  styleUrls: ['./slide-image.component.scss'],
})
export class SlideImageComponent {
  currentSlideIndex = 0;

  slides = [
    {
      id: 1,
      href: '',
      imageUrl: '../../../../../assets/img/slider/banner-zv-thang-9.jpg',
    },
    {
      id: 2,
      href: '',
      imageUrl: '../../../../../assets/img/slider/elgato-happy-slide.jpg',
    },
    {
      id: 3,
      href: '',
      imageUrl: '../../../../../assets/img/slider/loa-flash-sale.jpg',
    },
    { id: 4, href: '', imageUrl: '../../../../../assets/img/slider/web.jpg' },
  ];

  nextSlide(): Observable<any> {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
    return of({});
  }

  prevSlide() {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
  }

  ngOnInit() {
    this.switchSlide();
  }

  switchSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // 5000 milliseconds (5 seconds)
  }
}
