import { CommonModule, DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';

type optionsDto = {
  typeBalise?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  style?: any;
  styleLoad?: any;
  width?: string;
  height?: string;
};

@Component({
  selector: 'ngx-text-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ngx-text-skeleton.component.html',
  styleUrls: ['./ngx-text-skeleton.component.scss'],
})
export class NgxTextSkeletonComponent implements AfterViewInit {
  @Input() value!: string | null;
  @Input() condition!: boolean | null;
  @Input() options: optionsDto = {};

  @ViewChild('filterDiv') filterDivRef!: ElementRef;
  @ViewChildren('animation') animation!: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngAfterViewInit(): void {
    this.updateStyleAnimation(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes?.['value']?.firstChange === false ||
      changes?.['condition']?.firstChange === false ||
      changes?.['options']?.firstChange === false
    )
      this.updateStyleAnimation();
  }

  updateStyleAnimation(init?: boolean) {
    const parentColor =
      this.filterDivRef.nativeElement.parentNode.style.color !== ''
        ? this.filterDivRef.nativeElement.parentNode.style.color
        : window.getComputedStyle(this.filterDivRef.nativeElement.parentNode)
            .color;

    const child = this.document.createElement(this.options?.typeBalise ?? 'p');
    child.textContent = '&nbsp;';

    child.style.visibility = 'hidden';
    child.style.position = 'absolute';

    child.classList.add('simulate-height');
    this.renderer.appendChild(this.elementRef.nativeElement, child);

    const simulateHeightElement = document
      .getElementsByClassName('simulate-height')
      .item(0) as HTMLElement;

    const simulateHeight = simulateHeightElement.offsetHeight;

    this.renderer.removeChild(this.elementRef.nativeElement, child);

    if (init && (parentColor || simulateHeight) && this.animation.first) {
      if (parentColor)
        this.renderer.setStyle(
          this.animation.first.nativeElement,
          'background-color',
          parentColor
        );

      if (simulateHeight) {
        this.renderer.setStyle(
          this.animation.first.nativeElement,
          'height',
          `${simulateHeight}px`
        );
      }
    }

    // Wait animation create in dom
    this.animation.changes.subscribe((res: any) => {
      if (parentColor && this.animation.first)
        this.renderer.setStyle(
          this.animation.first.nativeElement,
          'background-color',
          parentColor
        );

      if (simulateHeight && this.animation.first)
        this.renderer.setStyle(
          this.animation.first.nativeElement,
          'height',
          `${simulateHeight}px`
        );
    });
  }
}
