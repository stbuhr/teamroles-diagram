import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslocoService {
  translate(key: string): string {
    switch (key) {
      case 'trs_team-role.trk_middle':
        return 'Allrounder';
      case 'trs_team-role.trk_activity-personal':
        return 'Begeisterer';
      case 'trs_team-role.trk_activity':
        return 'Der Aktive';
      case 'trs_team-role.trk_activity-methodical':
        return 'Koordinator';
      case 'trs_team-role.trk_methodical':
        return 'Experte';
      case 'trs_team-role.trk_methodical-social':
        return 'Fachlicher Vermittler';
      case 'trs_team-role.trk_social':
        return 'Teamplayer';
      case 'trs_team-role.trk_activity-social':
        return 'Initiator';
      case 'trs_team-role.trk_personal-social':
        return 'Unterstützer';
      case 'trs_team-role.trk_methodical-personal':
        return 'Verantwortlicher';
      case 'trs_team-role.trk_personal':
        return 'Stilles Vorbild';
    }
    return key;
  }
}
