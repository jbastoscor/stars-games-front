import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RatingModule } from 'ngx-bootstrap/rating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { AdmComponent } from './views/adm/adm.component';
import { LoaderComponent } from './components/loader/loader.component';
import { Heading1Component } from './components/heading1/heading1.component';
import { AdmCadastroCategoriesComponent } from './components/adm-cadastro-categories/adm-cadastro-categories.component';
import { AdmCadastroGamesComponent } from './components/adm-cadastro-games/adm-cadastro-games.component';
import { AdmConsultaCategoriesComponent } from './components/adm-consulta-categories/adm-consulta-categories.component';
import { AdmConsultaUpdateGamesComponent } from './components/adm-consulta-update-games/adm-consulta-update-games.component';
import { AdmDeleteCategoriesComponent } from './components/adm-delete-categories/adm-delete-categories.component';
import { AdmDeleteGamesComponent } from './components/adm-delete-games/adm-delete-games.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SignInSignUpComponent } from './components/sign-in-sign-up/sign-in-sign-up.component';
import { SignInSignUpPageComponent } from './views/sign-in-sign-up-page/sign-in-sign-up-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfileComponent } from './views/profile/profile.component';
import { GameCategoriesComponent } from './components/game-categories/game-categories.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';
import { CategoryGamesComponent } from './components/category-games/category-games.component';
import { CategoryGamesPageComponent } from './views/category-games-page/category-games-page.component';
import { BannerHomeComponent } from './components/banner-home/banner-home.component';
import { CarrosselGamesRecommendedComponent } from './components/carrossel-games-recommended/carrossel-games-recommended.component';
import { CarrosselGamesCategoryComponent } from './components/carrossel-games-category/carrossel-games-category.component';
import { GameComponent } from './views/game/game.component';
import { BannerGameComponent } from './components/banner-game/banner-game.component';
import { AvaliacaoGameComponent } from './components/avaliacao-game/avaliacao-game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdmComponent,
    LoaderComponent,
    Heading1Component,
    AdmCadastroCategoriesComponent,
    AdmCadastroGamesComponent,
    AdmConsultaCategoriesComponent,
    AdmConsultaUpdateGamesComponent,
    AdmDeleteCategoriesComponent,
    AdmDeleteGamesComponent,
    FooterComponent,
    HeaderComponent,
    SignInSignUpComponent,
    SignInSignUpPageComponent,
    UserProfileComponent,
    ProfileComponent,
    GameCategoriesComponent,
    CategoriesComponent,
    PageNotFoundComponent,
    NotFoundPageComponent,
    CategoryGamesComponent,
    CategoryGamesPageComponent,
    BannerHomeComponent,
    CarrosselGamesRecommendedComponent,
    CarrosselGamesCategoryComponent,
    GameComponent,
    BannerGameComponent,
    AvaliacaoGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule,
    RatingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
