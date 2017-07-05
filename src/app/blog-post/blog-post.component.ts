import { Component, OnInit } from '@angular/core';
import { TumblrService } from '../tumblr.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {
  private routeSub: any;
  private postSub: any;
  redirect_url: String;
  post: any;
  constructor(private tumblrService: TumblrService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      var postId = +params['id']; // (+) converts string 'id' to a number
      if (this.postSub) this.postSub.unsubscribe();
      this.postSub = this.tumblrService.getPost(postId).subscribe(post => {
        this.post = post;
      })
    });
  }
  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.routeSub.unsubscribe();
  }
}
