import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ButtonProps } from "./model/botton-prop";
import { MatIconModule } from "@angular/material/icon";
import { NgClass } from '@angular/common';
import { ButtonType } from "./types/types";


@Component({
    standalone: true,
    selector: 'app-button',
    templateUrl: './button.html',
    styleUrl: './button.css',
    imports: [MatIconModule, NgClass],
})
export class ButtonComponent implements OnInit{
    @Input() key: string;
    @Input() label: string;
    @Input() icon?: string;
    @Input() type: ButtonType = 'primary';
    @Input() disabled?: boolean = false;
    @Input() hidden?: boolean = false;
    @Input() props?: ButtonProps;

    public types: Record<ButtonType, string> = {
        primary: "btn btn-primary",
        secondary: "btn btn-secondary",
        success: "btn btn-success",
        danger: "btn btn-danger",
        warning: "btn btn-warning",
        info: "btn btn-info",
        light: "btn btn-light",
        dark: "btn btn-dark",
    };
    
    @Output() onClick = new EventEmitter<void>();

    ngOnInit(): void {
         if(this.props){
            this.key = this.props.key;
            this.label = this.props.label;
            this.icon = this.props.icon;
            this.type = this.props.type;
            this.disabled = this.props.disabled;
            this.hidden = this.props.hidden;
        }
    }

    click(){
        this.onClick.emit();
    }
}