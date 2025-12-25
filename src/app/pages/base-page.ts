import { Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController, ModalController, NavController, ToastController } from "@ionic/angular";

export abstract class BasePage {

    private toastCtrl: ToastController;
    public modalCtrl: ModalController;
    public loadingCtrl: LoadingController;
    protected alertCtrl: AlertController;
    protected navCtrl: NavController;
    public loader: any;
    protected router: Router;
    protected activeRoute?: ActivatedRoute

    constructor(injector: Injector) {
        this.toastCtrl = injector.get(ToastController);
        this.modalCtrl = injector.get(ModalController);
        this.alertCtrl = injector.get(AlertController);
        this.loadingCtrl = injector.get(LoadingController);
        this.router = injector.get(Router);
        this.activeRoute = injector.get(ActivatedRoute);
        this.navCtrl = injector.get(NavController);
    }

    async showToast(message: string = '', color: string = 'medium', buttons: any = null, duration: number = 5000, position: any = 'bottom') {

        const closeText = 'Kapat';

        const toast = await this.toastCtrl.create({
            message: message,
            color: color,
            position: position,
            cssClass: 'tabs-bottom',
            duration: duration,
            buttons: buttons || [{
                text: closeText,
                role: 'cancel',
            }]
        });

        return toast.present();
    }

    async showLoadingView(params: { showOverlay: boolean }, message: string = '') {

        if (params.showOverlay) {

            this.loader = await this.loadingCtrl.create({
                message: message,
                backdropDismiss: true,
            });

            return await this.loader.present();

        }

        return true;

    }
    dismissLoadingView() {
        return this.loader?.dismiss();
    }

    navigateTo(page: any, queryParams: any = {}) {
        return this.router.navigate([page], { queryParams: queryParams });
    }

    onBack() {
        this.navCtrl.back();
    }

    routeTo(url: string, data?: any) {
        data ? this.router.navigate([url, data]) : this.router.navigate([url]);
    }

    reload() {
        window.location.reload();
    }

    async showLoading() {
        this.loadingCtrl.create({
            duration: -1,
        }).then(loading => loading.present());
    }

    async dismissLoading() {
        const loading = await this.loadingCtrl.getTop();
        if (loading) {
            await loading.dismiss();
        }
    }
}