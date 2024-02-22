import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeamRolesChartComponent } from './team-roles-chart/team-roles-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TeamRolesChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'teamroles-diagram';
}
