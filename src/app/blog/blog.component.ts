import { TumblrService } from '../tumblr.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Array<any>;
  redirect_url: String;
  constructor(private tumblrService:TumblrService) { }

  ngOnInit() {
    this.redirect_url = window.location.href;
    this.tumblrService.getPosts().subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    })
  }
  getPostBody(post) {
    if (post.hasOwnProperty('body_abstract')) {
      return post.body_abstract;
    }
    return post.body;
  }

}
