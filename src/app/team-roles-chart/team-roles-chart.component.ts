import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  input,
} from '@angular/core';
import { TranslocoService } from '../transloco.service';

export type TeamRolesCompetence =
  | 'personal'
  | 'activityPersonal'
  | 'activity'
  | 'personalSocial'
  | 'activitySocial'
  | 'activityMethodical'
  | 'methodicalPersonal'
  | 'social'
  | 'methodicalSocial'
  | 'methodical'
  | 'middle';

export interface SegmentInfo {
  teamRolesCompetence: TeamRolesCompetence;
  value: number;
  text: string;
}

export interface SegmentPart {
  importance: number;
}

export interface Segment {
  number: number;
  value: number;
  text: string;
  radius: number;
  startAngle: number;
  endAngle: number;
  parts: SegmentPart[];
}

export interface Point {
  x: number;
  y: number;
}

export const EMPTY_PART: SegmentPart = {
  importance: 0,
};

@Component({
  selector: 'app-team-roles-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-roles-chart.component.svg',
  styleUrl: './team-roles-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamRolesChartComponent implements OnInit {
  width = input(200);
  height = input(200);

  private _segments: Segment[] = [];

  @Input() set segmentInfos(segmentInfos: SegmentInfo[] | null) {
    if (segmentInfos) {
      for (let i = 0; i < segmentInfos.length; i++) {
        const segment = this.initSegment(i, segmentInfos[i].text, 100);
        segment.value = segmentInfos[i].value;
        this.segments[i] = segment;
      }
    }
  }

  get segments(): Segment[] {
    return this._segments;
  }

  imageSize: number = 60;

  cornerCount = 10;
  texts = [
    this.transloco.translate('trs_team-role.trk_activity-personal'),
    this.transloco.translate('trs_team-role.trk_activity'),
    this.transloco.translate('trs_team-role.trk_activity-methodical'),
    this.transloco.translate('trs_team-role.trk_methodical'),
    this.transloco.translate('trs_team-role.trk_methodical-social'),
    this.transloco.translate('trs_team-role.trk_social'),
    this.transloco.translate('trs_team-role.trk_activity-social'),
    this.transloco.translate('trs_team-role.trk_personal-social'),
    this.transloco.translate('trs_team-role.trk_methodical-personal'),
    this.transloco.translate('trs_team-role.trk_personal'),
    this.transloco.translate('trs_team-role.trk_middle'),
  ];

  constructor(private transloco: TranslocoService) {}

  ngOnInit(): void {
    if (this.segments.length == 0) {
      //initialize with dummy values for cases where no real segment infos were given via @Input "segmentInfos"
      for (let i = 0; i < this.cornerCount; i++) {
        const segment = this.initSegment(i, this.texts[i], 100);
        this.segments.push(segment);
      }

      this.segments[0].value = 2;
      this.segments[1].value = 2;
      this.segments[2].value = 1;
      this.segments[3].value = 1;
      this.segments[4].value = 2;
      this.segments[5].value = 4;
      this.segments[6].value = 3;
      this.segments[7].value = 3;
      this.segments[8].value = 1;
      this.segments[9].value = 2;
    }
    for (let i = 0; i < this.cornerCount; i++) {
      this.segments[i].text = this.texts[i];
    }
  }

  initSegment(index: number, text: string, radius: number): Segment {
    if (text == null || text == undefined || text == '')
      text = this.texts[index];

    return {
      number: index,
      value: 0,
      text: text,
      radius: radius,
      startAngle: (index * 2 * Math.PI) / this.cornerCount,
      endAngle: ((index + 1) * 2 * Math.PI) / this.cornerCount,
      parts: [
        {
          ...EMPTY_PART,
          importance: 4,
        },
        {
          ...EMPTY_PART,
          importance: 3,
        },
        {
          ...EMPTY_PART,
          importance: 2,
        },
        {
          ...EMPTY_PART,
          importance: 1,
        },
      ],
    };
  }

  getPoint(radius: number, angle: number): Point {
    const x = Math.sin(angle) * radius;
    const y = -Math.cos(angle) * radius;
    return { x, y };
  }

  getPath(segment: Segment, part: SegmentPart): string {
    const radius = (segment.radius * part.importance) / 4;
    const firstPoint = this.getPoint(radius, segment.startAngle);
    const secondPoint = this.getPoint(radius, segment.endAngle);
    return `M 0 0 L ${firstPoint.x} ${firstPoint.y} L ${secondPoint.x} ${secondPoint.y} Z`;
  }

  isVeryHighLevel(segment: Segment, part: SegmentPart): boolean {
    if (segment.value < part.importance) {
      return false;
    }
    return segment.value == 4;
  }

  isHighLevel(segment: Segment, part: SegmentPart): boolean {
    if (segment.value < part.importance) {
      return false;
    }
    return segment.value == 3;
  }

  isMediumLevel(segment: Segment, part: SegmentPart): boolean {
    if (segment.value < part.importance) {
      return false;
    }
    return segment.value == 2;
  }

  isLowLevel(segment: Segment, part: SegmentPart): boolean {
    if (segment.value < part.importance) {
      return false;
    }
    return segment.value == 1;
  }

  getText(index: number) {
    return this.texts[index];
  }

  getTextX(segment: Segment): number {
    return (
      Math.sin((segment.startAngle + segment.endAngle) / 2) *
      (segment.radius + 20)
    );
  }

  getTextY(segment: Segment): number {
    return (
      -Math.cos((segment.startAngle + segment.endAngle) / 2) *
        (segment.radius + 20) +
      4
    );
  }

  onSegmentClick(segmentIndex: number) {
    if (segmentIndex < this.segments.length) {
      console.log(this._segments[segmentIndex]);
    } else {
      console.log(segmentIndex);
    }
  }
}
