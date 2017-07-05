import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TumblrService {
  posts: any;
  constructor(private jsonp: Jsonp) {
    try {
      this.posts = JSON.parse(localStorage.getItem('blog.posts'));
    } catch (e) {

    }
  }
  getPosts(): Observable<Array<any>> {
    if (this.posts) {
      return Observable.of(this.posts);
    }
    return this.jsonp
      .request('https://api.tumblr.com/v2/blog/satsukitv.tumblr.com/posts/text?callback=JSONP_CALLBACK&reblog_info=true&notes_info=true&api_key=FdXg500s7QtYKmBdk1EuFp4wGSQWWOPHnTF9bHd6gP3vrFTmQc')
      .map(res => {
        var posts: Array<any> = res.json().response.posts;
        localStorage.setItem('blog.posts', JSON.stringify(posts));
        this.posts = posts;
        return this.posts;
      });
  }
  getPost(id) {
    function search(arr, id) {
      if (!arr) {
        return false;
      }
      for (var i in arr) {
        if (arr[i].id == id) {
          return arr[i];
        }
      }
      return false;
    }
    return this.getPosts().map(posts => {
      return search(posts, id);
    });
  }
}
