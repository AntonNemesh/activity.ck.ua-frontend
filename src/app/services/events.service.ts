import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  IEvent,
  IEventRequestParams,
  IEventResponse,
  IEventsResponse, IPlace
} from '../static/type';
import {ApiUrlService} from './api-url.service';
import {EventsRequestParamsHelper} from '../helpers';
import {IEventForm} from '../static/type/events.interface';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http: HttpClient, private apiUrlService: ApiUrlService) {
  }

  public getEventsFromDate(options: EventsRequestParamsHelper): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    const eventRequestParams: Partial<IEventRequestParams> = options.toJSON();

    for (const key in eventRequestParams) {
      if (!eventRequestParams.hasOwnProperty(key)) {
        continue;
      }
      params = params.set(key, eventRequestParams[key]);
    }

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink('events'), {params});
    // return this.http.get<IEvent[]>('http://localhost:3001/events', { params });
  }

  public getEventsNow(page: number = 1, limit: number = 6): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink('events/now'), {params});
    // return this.http.get<IEvent[]>('http://localhost:3001/events-now', { params });
  }

  public getEventById(eventId: string): Observable<IEventResponse> {
    return this.http.get<IEventResponse>(this.apiUrlService.generateApiLink(`events/${eventId}`));
    // return this.http.get<IEvent>(`http://localhost:3001/events/${eventId}`);
  }

  public getEventsByPlaceId(placeId: string, page: number = 1, limit: number = 2): Observable<IEventsResponse> {
    let params: HttpParams = new HttpParams();
    params = params.set('place_id', placeId.toString());
    params = params.set('_page', page.toString());
    params = params.set('_limit', limit.toString());

    return this.http.get<IEventsResponse>(this.apiUrlService.generateApiLink(`events`), {params});
  }

  public buildRequest(dataForm: IEventForm): any {
    const event: any = {};

    event.name = dataForm.name;
    event.organizer = dataForm.organizer;
    event.price = dataForm.price;
    event.website = dataForm.website;
    event.address = dataForm.address;
    event.phone = dataForm.phone;
    event.date = dataForm.date;
    event.start = dataForm.start;
    event.end = dataForm.end;
    event.program = dataForm.program;
    event.details = dataForm.details;
    event.accessibility = dataForm.accessibility;
    event.child_friendly = dataForm.child_friendly;
    event.dog_friendly = dataForm.dog_friendly;

    return event;
  }

  public saveEvent(eventData: Partial<IEvent>): Observable<any> {
    return this.http.post<any>(this.apiUrlService.generateApiLink('places'), eventData);
  }
}
