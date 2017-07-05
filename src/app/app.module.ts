import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JsonpModule } from '@angular/http';
import { TumblrService } from './tumblr.service'
import { AppComponent } from './app.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { ProjectsComponent } from './projects/projects.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog-post/blog-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    ProjectsComponent,
    BlogComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    JsonpModule,
    RouterModule.forRoot([
      { path: '', component: HomeViewComponent, pathMatch: 'full'},
      { path: 'projects', component: ProjectsComponent, pathMatch: 'full'},
      { path: 'blog/:id', component: BlogPostComponent },
      { path: 'blog', component: BlogComponent, pathMatch: 'full'}
    ])
  ],
  providers: [TumblrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
