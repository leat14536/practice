import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'

import {Hero} from './hero'
import {HeroService} from './hero.service'

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getHeroes()
  }

  title = 'Tour of Heroes'
  selectHero: Hero
  heroes: Hero[]

  onSelect(hero) {
    this.selectHero = hero
  }

  getHeroes(): void {
    this.heroService.getHeros().then(heroes => this.heroes = heroes)
  }

  gotoDetail(): void {
    this.router.navigate(['./detail', this.selectHero.id])
  }

  add(name: string): void {
    name = name.trim()
    if (!name)return
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero)
        this.selectHero = null
      })
  }

  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero)
        if (this.selectHero === hero) this.selectHero = null
      })
  }
}
