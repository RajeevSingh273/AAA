import {
  Component,
  ViewChild,
  ElementRef,
  Inject,
  Renderer,
  OnInit
} from "@angular/core";
import { LocationStrategy, PlatformLocation, Location } from "@angular/common";
import { NavigationComponent } from "./modules/client/shared/navigation/navigation.component";
import { DOCUMENT } from "@angular/platform-browser";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  private _router: Subscription;
  @ViewChild(NavigationComponent) navbar: NavigationComponent;

  constructor(
    private renderer: Renderer,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private element: ElementRef,
    public location: Location
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this._router = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((event: NavigationEnd) => {
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else {
        window.document.activeElement.scrollTop = 0;
      }
      this.navbar.sidebarClose();
    });
  this.renderer.listenGlobal("window", "scroll", event => {
    const number = window.scrollY;
    if (number > 150 || window.pageYOffset > 150) {
      // add logic
      navbar.classList.remove("navbar-transparent");
    } else {
      // remove logic
      navbar.classList.add("navbar-transparent");
    }
  });
  var ua = window.navigator.userAgent;
  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf("rv:");
    var version = parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }
  if (version) {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("ie-background");
  }
  }
  removeFooter() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (titlee === "signup" || titlee === "nucleoicons") {
      return false;
    } else {
      return true;
    }
  }
}
