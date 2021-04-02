import { Injectable } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormHelper {

    getErrorsDetail(form: FormGroup) {
        const erros = this.getFormValidationErrors(form);
        let errosUnicos = erros.reduce((acc, cur) => [
            ...acc.filter((obj) => obj.key !== cur.key), cur
        ], []);
        return this.getErrorsMsg(form, errosUnicos);
    }

    getErrorMsg(form: FormGroup, erro) {
        console.log(erro.error);
        let detail = erro.key.charAt(0).toUpperCase() + erro.key.slice(1) + " - ";
        if (form.get(erro.key).hasError("required")) {
            detail += "Campo de preenchimento obrigatorio";
        } else if (form.get(erro.key).hasError("blankStringValidator")) {
            detail += "Campo não pode ter espaços em branco";
        } else if (form.get(erro.key).hasError("pattern")) {
            detail += "Campo esta com formato incorreto";
        } else if (form.get(erro.key).hasError("min")) {
            detail += "Campo de ter o minimo de caracteres";
        } else if (form.get(erro.key).hasError("max")) {
            detail += "Campo ultrapassou o maximo de caracteres";
        }
        return detail;
    }

    getErrorsMsg(form: FormGroup, erros: string[]) {
        let details = [];
        for (let i = 0; i < erros.length; i++) {
            details.push(this.getErrorMsg(form, erros[i]));
        }
        return details;
    }

    getFormValidationErrors(form: FormGroup) {
        const result = [];
        Object.keys(form.controls).forEach(key => {
            const controlErrors: ValidationErrors = form.get(key).errors;
            if (controlErrors) {
                Object.keys(controlErrors).forEach(keyError => {
                    result.push({
                        'key': key,
                        'error': keyError,
                        'value': controlErrors[keyError]
                    });
                });
            }
        });
        return result;
    }

}