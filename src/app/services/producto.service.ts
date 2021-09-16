import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();

   }

  private cargarProductos() {
    this.http.get('https://angular-html-mx-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((res: any) => {
        console.log(res);
        this.productos = res;
        this.cargando = false;
    })
  }
}
