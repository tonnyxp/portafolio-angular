import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoDetalle } from '../../models/producto-detalle.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  id: string = '';
  producto: ProductoDetalle = {};

  constructor(private route: ActivatedRoute,
              public productoService: ProductoService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // console.log(param.id);
      this.productoService.getProducto(params['id'])
        .subscribe((producto: ProductoDetalle) => {
          this.id = params['id'];
          this.producto = producto;
      });
    });
  }



}
