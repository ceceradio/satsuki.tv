import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
declare var twttr: any;
@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  tweetLoaded: boolean = false;
  chRef: ChangeDetectorRef;

  constructor(private _chRef: ChangeDetectorRef) {
    this.chRef = _chRef;
  }

  ngOnInit() {
    const self = this;
    const tweets = ['691643768236277762','702244202684530689', '695346659891359745', '668271435979321344', '631736185363267584', '619308905747714048'];
    this.tweetLoaded = false;
    if (twttr) {
      twttr.widgets.createTweet(
          tweets.splice(Math.floor(Math.random()*tweets.length),1)[0],
          document.getElementById('tweet1'),
          {}
        ).then(function() {
          self.tweetLoaded = true;
          self.chRef.detectChanges();
        });
    }
  }

}
