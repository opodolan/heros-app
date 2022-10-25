import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HerosService } from '../services/heros.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {

  heroId: number;
  addForm: FormGroup;
  submitted = false;

  constructor(
    private herosService: HerosService,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(300)]],
    });

    this.heroId = this.route.snapshot.params["id"];

    if (this.heroId)
      this.getHero(this.heroId);
  }

  getHero(id: number): void {
    this.herosService.get(id)
      .subscribe({
        next: (data) => {
          this.addForm.controls['title'].setValue(data.title);
          this.addForm.controls['description'].setValue(data.description);
        },
        error: (e) => console.error(e)
      });
  }

  saveHero(): void {
    this.submitted = true;

    if (!this.addForm.valid)
      return;

    const data = {
      title: this.addForm.controls['title'].value,
      description: this.addForm.controls['description'].value,
    };

    this.herosService.create(data)
      .subscribe({
        next: () => {
          this.router.navigate(['/heros']);
        },
        error: (e) => console.error(e)
      });
  }

  updateHero(): void {
    this.submitted = true;

    if (!this.addForm.valid)
      return;

    const data = {
      title: this.addForm.controls['title'].value,
      description: this.addForm.controls['description'].value,
    };

    this.herosService.update(this.heroId, data)
      .subscribe({
        next: () => {
          this.router.navigate(['/heros']);
        },
        error: (e) => console.error(e)
      });
  }
}
