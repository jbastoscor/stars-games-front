import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  windowWidth: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  @HostListener('window:resize', ['$event'])
  updateWindowDimensions(): void {
    this.windowWidth = window.innerWidth;
  }
}