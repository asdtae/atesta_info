/// prof. Ionel-Vasile Pit-Rada
/// Colegiul National Traian Drobeta Turnu Severin

///complexitate exponentiala...
#include <fstream>
using namespace std;
ifstream  fin("recyclebin.in");
ofstream fout("recyclebin.out");
int n,v[1002],w[1002],i,j,vmax=0,st[30],viz[30];
void back(int k, int s, int caz) {
    int i,j,l,t;
    if((caz==0) || (caz>0 && k<=2*caz-1)) {
        if(s==n) {
            l=0;
            t=0;
            for(int i=1; i<=k-1; i++) {
                if(i%2==1) {
                    for(j=l+1; j<=l+st[i]; j++) {
                        t+=v[j];
                    }
                }
                l=l+st[i];
            }
            vmax=max(vmax,t);
        } else {
            if(k%2==0) {
                for(i=1; i<=n-s; i=i*2) {
                    if(viz[i]==0) {
                        st[k]=i;
                        viz[i]=1;
                        back(k+1,s+i,caz);
                        viz[i]=0;
                    }
                }
            } else {
                for(i=0; i<=n-s; i++) {
                    st[k]=i;
                    back(k+1,s+i,caz);
                }
            }
        }
    }
}
int main() {
    fin>>n;
    for(i=1; i<=n; i++) {
        fin>>v[i];
    }
    while(n>0 && v[n]<=0)n--;
    i=1;
    while(i<=n && v[i]<0)i++;
    for(j=i; j<=n; j++) {
        v[j-i+1]=v[j];
    }
    n=n-i+1;
    for(i=1; i<=n; i++) {
        w[i]=w[i-1]+v[i];
    }
    if(n<=30) {
        back(1,0,0);
        fout<<vmax;
    } else {
        ///incerc fara stergere
        vmax=0;
        back(1,0,1);
        ///poate cu o singura stergere
        back(1,0,2);
        ///poate cu 2 stergeri
        back(1,0,3);
        fout<<vmax;
    }
    return 0;
}
