import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
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

  constructor(private renderer: Renderer2) {}

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

    if (init && parentColor && this.animation.first)
      this.renderer.setStyle(
        this.animation.first.nativeElement,
        'background-color',
        parentColor
      );

    this.animation.changes.subscribe((res: any) => {
      console.log(res);
      if (parentColor && this.animation.first)
        this.renderer.setStyle(
          this.animation.first.nativeElement,
          'background-color',
          parentColor
        );
    });
  }
}
