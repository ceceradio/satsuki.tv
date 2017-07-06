import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
declare var twttr: any;
@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  tweetLoaded: boolean = false;

  constructor(private changeRef: ChangeDetectorRef, private elementRef: ElementRef) {}

  ngOnInit() {
    const tweets:string[] = [
      '691643768236277762',
      '702244202684530689',
      '695346659891359745',
      '668271435979321344',
      '631736185363267584',
      '619308905747714048'
    ];
    if (twttr) {
      let randomIndex:number;
      randomIndex = Math.floor(Math.random()*tweets.length);
      twttr.widgets.createTweet(
        tweets[randomIndex],
        this.elementRef.nativeElement.querySelector('#tweet1'),
        {}
      ).then(() => {
        this.tweetLoaded = true;
        this.changeRef.detectChanges();
      });
    }
  }

}
