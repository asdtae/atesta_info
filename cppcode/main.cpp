#include <iostream>
#include <fstream>
#include <string>
#include <cstring>
#include <random>
#include <vector>
#include <limits>

using namespace std;

#define Black "\033[30m"
#define Red "\033[31m"
#define Green "\033[32m"
#define Yellow "\033[33m"
#define Blue "\033[34m"
#define Magenta "\033[35m"
#define Cyan "\033[36m"
#define White "\033[37m"

#define Bright_Black "\033[90m"
#define Bright_Red "\033[91m"
#define Bright_Green "\033[92m"
#define Bright_Yellow "\033[93m"
#define Bright_Blue "\033[94m"
#define Bright_Magenta "\033[95m"
#define Bright_Cyan "\033[96m"
#define Bright_White "\033[97m"

void fel01(int a, int b)
{
    int t[100]; b=-1;
    cout << "Enter the number a: ";
    cin >> a;

    while(b<100)
    {
        cout << "Enter the number b( max:100 ): ";
        cin >> b;
        if(b>101) b=-1;
    }

    t[0] = 0;
    t[1] = 1;

    for (int i = 2; i < b; i++) {
        t[i] = t[i-2] + t[i-1];
    }

    for (int i = a; i < b; i++) {
        if(t[i] > b) break;
        cout<<t[i]<<' ';
    }

    cout<<'\n';
}

void fel02()
{
    int n,t[500]={0}, i;
    bool ok=true;
    cout<<"Szamok szama: "; cin>>n;

    for(i=0; i<n; i++)
    {
        cin>>t[i];
    }

    for(i=0; i<n; i++)
    {
        for(int j=0; j<n-i-1; j++)
        {
            if(t[j]>t[j+1]) swap(t[j],t[j+1]);
        }
    }

    for(i=0; i<n; i++)
    {
        if(t[i]!=0)cout<<t[i]<<' ';
        else ok=false;
    }

    if(!ok) cout<<"NU EXISTA";
    cout<<'\n';
}

void fel03()
{
    int n,mem;
    int lastNumb;
    bool p=true, cresc=true;
    cout<<"Szam: ";cin>>n; mem=n;

    lastNumb=n%10;
    n/=10;

    while(n!=0)
    {
        if(n%10 < lastNumb && cresc ) cresc = false;
        if(n%10 > lastNumb && !cresc ) { p=false; break; }

        lastNumb = n%10;
        n/=10;
    }

    n=mem;

    cout<<'\n';

    if(p) printf("%d \"hegy-volgy\" szam \n",n);
    else printf("%d NEM \"hegy-volgy\" szam \n",n);
}

void fel04()
{
    int n,m,i;

    cout<<"n: ";cin>>n;
    int a[n];
    cout<<"a[n]: ";
    for(i=0; i<n;i++)
    {
        cin>>a[i];
    }

    cout<<"m: ";cin>>m;
    int b[m];
    cout<<"b[m]: ";
    for(i=0; i<m; i++)
    {
        cin>>b[i];
    }

    int c[n+m];

    for(i=0; i<n; i++)
    {
        c[i] = a[i];
    }

    for(i=0; i<n+m; i++)
    {

    }

    for(i=0; i<m+n; i++)
    {
        cout<<c[i]<<' ';
    }
}

void fel11(int n, vector<int> &arr)
{
    cout << "n: "; cin >> n;

    vector<vector<int>> matrix(n, vector<int>(n, 0));

    int fent = 0, lent = n - 1, bal = 0, jobb = n - 1;
    int index = 0;

    while (fent <= lent && bal <= jobb) {
        for (int i = bal; i <= jobb; i++) matrix[fent][i] = arr[index++];
        fent++;

        for (int i = fent; i <= lent; i++) matrix[i][jobb] = arr[index++];
        jobb--;

        if (fent <= lent) {
            for (int i = jobb; i >= bal; i--) matrix[lent][i] = arr[index++];
            lent--;
        }

        if (bal <= jobb) {
            for (int i = lent; i >= fent; i--) matrix[i][bal] = arr[index++];
            bal++;
        }
    }

    for (const auto &row : matrix) {
        for (int num : row) {
            cout << num << " ";
        }
        cout << endl;
    }
}

void fel12(int n, vector<vector<int>> &matrix)
{
    vector<pair<int, int>> kimenet;

    int dx[] = {-1, -1, -1, 0, 1, 1, 1, 0};
    int dy[] = {-1, 0, 1, 1, 1, 0, -1, -1};

    for (int i = 1; i < n - 1; i++) {
        for (int j = 1; j < n - 1; j++) {
            bool paratlanok = true;
            for (int k = 0; k < 8; k++) {
                int ni = i + dx[k], nj = j + dy[k];
                if (matrix[ni][nj] % 2 == 0) {
                    paratlanok = false;
                    break;
                }
            }
            if (paratlanok) kimenet.emplace_back(i, j);
        }
    }

    for (const auto &p : kimenet) {
        cout << p.first + 1 << " " << p.second + 1 << endl;
    }
}

void fel13(int n, vector<vector<int>> &matrix)
{
    cout << "Oszlop mini: ";
    for (int j = 0; j < n; j++) {
        int mini = numeric_limits<int>::max();
        for (int i = 0; i < n; i++) {
            mini = min(mini, matrix[i][j]);
        }
        cout << mini << " ";
    }
    cout << endl;
}

void fel14(int n, int m, vector<vector<int>> &matrix)
{
    int maxi = numeric_limits<int>::min();
    int maxi_sor = -1, maxi_oszl = -1;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (matrix[i][j] > maxi) {
                maxi = matrix[i][j];
                maxi_sor = i;
                maxi_oszl = j;
            }
        }
    }

    cout << "Maxi: " << maxi << " " << maxi_sor + 1 << " " << maxi_oszl + 1 << "\n";

    vector<vector<int>> uj_matrix;
    for (int i = 0; i < n; i++) {
        if (i == maxi_sor) continue;
        vector<int> uj_sor;
        for (int j = 0; j < m; j++) {
            if (j == maxi_oszl) continue;
            uj_sor.push_back(matrix[i][j]);
        }
        uj_matrix.push_back(uj_sor);
    }

    cout << "\n";
    for (const auto &row : uj_matrix) {
        for (int val : row) {
            cout << val << " ";
        }
        cout << endl;
    }
}

void fel15(int n, int m, vector<vector<int>> &matrix)
{
    vector<vector<int>> forditott(m, vector<int>(n));

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            forditott[m - 1 - j][i] = matrix[i][j];
        }
    }

    for (const auto &row : forditott) {
        for (int val : row) {
            cout << val << " ";
        }
        cout << endl;
    }
}

void fel16(int n)
{
    vector<vector<int>> matrix(n, vector<int>(n, 1));

    for (int i = 1; i < n / 2 + 1; i++) {
        for (int j = i; j < n - i; j++) {
            matrix[j][i] = matrix[j][n - i - 1] = 2 * i + 1;
        }
    }

    for (const auto &row : matrix) {
        for (int num : row) {
            cout << num << " ";
        }
        cout << endl;
    }
}

void fel17(int n)
{
    string nToStr = to_string(n);
    int hossz = nToStr.length();
    vector<vector<int>> matrix(hossz, vector<int>(hossz));

    for (int i = 0; i < hossz; i++) {
        for (int j = 0; j < hossz; j++) {
            matrix[i][j] = nToStr[j] - '0';
        }
    }

    for (const auto &i : matrix) {
        for (int j : i) {
            cout << j << " ";
        }
        cout << endl;
    }
}

void fel18(int n, int m)
{
    vector<vector<int>> matrix(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> matrix[i][j];
        }
    }

    vector<int> pontok;
    int kerrO=0, kerrS=0;

    for (int i = 0; i < n; i++) {
        int maxi = matrix[i][0], oszlId = 0;

        for (int j = 1; j < m; j++) {
            if (matrix[i][j] > maxi) {
                maxi = matrix[i][j];
                oszlId = j;
                kerrO=j; kerrS=i;
            }
        }

        bool keresettPontE = true;
        for (int k = 0; k < n; k++) {
            if (matrix[k][oszlId] < maxi) {
                keresettPontE = false;
                break;
            }
        }

        if (keresettPontE) pontok.push_back(maxi);
    }

    for (int val : pontok) {
        cout << kerrO<<' '<<kerrS-1<<' '<< val << " ";
    }
    cout << endl;
}

void fel19(int n, int m)
{
    int maxi= -INT_MAX;
    int db=0;
    cout<<"n: ";cin>>n;
    cout<<"m: ";cin>>m;

    int t[100][100];

    for(int i=0; i<n; i++)
    {
        for(int j=0; j<m; j++)
        {
            cin>>t[i][j];
            if(i==0 || j==0 || i==(n-1) || j==(m-1))
            {
                if( t[i][j] > maxi )db=0;
                if(t[i][j] > maxi) maxi = t[i][j];
                if(t[i][j] == maxi) db++;
            }
        }
    }

/*
75 28 21 73 33
82 36 27 21 21
48 52 39 32 22
82 28 28 28 82
29 10 20 30 40
*/

    cout<<maxi<<' '<<db;

    cout<<'\n';
}

void fel21()
{
    /*
Atestat
informatica
Bac
programator
Pascal
Cpp
Competente
    */
    int i=0;
    char mgh[6]="aeiou";

    struct {
        int mgh=0;
        char sz[21]{};
    }t[100];

    struct {
        int mgh;
        char sz[21];
    }swc{};

    ifstream f("a.in");

    while(!f.eof())
    {
        f.getline(t[i].sz,20);
        for(int j=0; j<5; j++)
        {
            if( strchr(t[i].sz,mgh[j]) ) t[i].mgh++;
        }

        i++;
    }

    for(int j=0; j<=i; j++)
    {
        for(int k=0; k<=i; k++)
        {
            if(t[j].mgh < t[k].mgh)
            {
                strcpy(swc.sz,t[j].sz);
                strcpy(t[j].sz,t[k].sz);
                strcpy(t[k].sz,swc.sz);

                swc.mgh = t[j].mgh;
                t[j].mgh = t[k].mgh;
                t[k].mgh = swc.mgh;
            }
        }
    }

    int len1, len2;

    for(int j=1; j<i; j++)
    {
        if( t[j].mgh == t[j-1].mgh )
        {
            len1 = strlen(t[j-1].sz);
            len2 = strlen(t[j].sz);

            if( len1 > len2)
            {
                strcpy(swc.sz,t[j].sz);
                strcpy(t[j].sz,t[j-1].sz);
                strcpy(t[j-1].sz,swc.sz);

                swc.mgh = t[j].mgh;
                t[j].mgh = t[j-1].mgh;
                t[j-1].mgh = swc.mgh;
            }
        }
    }

    for(int j=0; j<=i; j++)
    {
        if(strlen(t[j].sz)>1) cout<<t[j].sz<<'\n';
    }

    cout<<'\n';
}

void fel22()
{
    char szo[21];
    char s2[21];
    char s3[20];
    char mgh[6]="aeiou";

    ifstream f("a.in");

    f>>szo;
    /*
informatica
    */

    for(int i=0; i<5; i++)
    {
        if(strchr(szo,mgh[i])!=nullptr)
        {
            strcpy(s2,szo);
            for(int k=0; k<strlen(s2); k++)
            {
                if(s2[k]==mgh[i])
                {
                    cout<<Bright_Green<<s2[k]<<Bright_White;

                    strcpy(s3,s2);
                    s3[k] = '\0';
                    strcpy(s2+k,s2+k+1);

                    cout<<s2<<'\n';
                    //strcpy(s2+poi,s3);
                }
            }
            cout<<Bright_Blue<<s2<<'\n'<<Bright_White;
        }
    }
}

void fel23()
{
    ifstream f("a.in");

    char c1,c2;
    f>>c1>>c2;

    char s;
    char s1[400]{};
    char s2[400]{};
    int k=0;
    while(!f.eof())
    {
        f>>s;
        if(s>= 'A' && s<='z')
        {
            if(s == c1)
            {
                s1[k] = s;
                s2[k] = c2;
                k++;
            }
            else if(s == c2)
            {
                s1[k] = s;
                s2[k] = c1;
                k++;
            }
            else
            {
                s1[k] = s;
                s2[k] = s;
                k++;
            }
        }
    }

    for(int i=0; i<=k; i++)
    {
        if(s1[i]==c1)
        {
            cout<<Bright_Red<<s1[i]<<' '<<Bright_White;
        }
        else if(s1[i]==c2)
        {
            cout<<Bright_Green<<s1[i]<<' '<<Bright_White;
        }
        else cout<<s1[i]<<' ';
    }
    cout<<'\n';
    for(int i=0; i<=k; i++)
    {
        if(s2[i]==c1)
        {
            cout<<Bright_Red<<s2[i]<<' '<<Bright_White;
        }
        else if(s2[i]==c2)
        {
            cout<<Bright_Green<<s2[i]<<' '<<Bright_White;
        }
        else cout<<s2[i]<<' ';
    }
    cout<<'\n';
}

void bac_2_2()
{
    int mgdb[100], db, n;
    char t[100][20];

    cin>>n;
    for(int i=0; i<n; i++)
    {
        cin>>t[i]; db=0;
        for(int j=0; j<strlen(t[i]); j++)
        {
            if(t[i][j] == 'a' || t[i][j] == 'e' || t[i][j] == 'i' || t[i][j] == 'o' || t[i][j] == 'u') db++;
        }

        mgdb[i] = db;
    }

    for(int i=0; i<n; i++)
    {
        if(mgdb[i] == db && i!=(n-1)) cout<<t[i]<<' ';
    }

    cout<<'\n';
}

void drawUI() {
    char buffer[50];
    char felbuffer[50];

    random_device rd;
    mt19937 mt(rd());
    uniform_int_distribution<int> randDist(0, 15);

    const char* colors[16] = {
            Black, Red, Green, Yellow, Blue, Magenta, Cyan, White,
            Bright_Black, Bright_Red, Bright_Green, Bright_Yellow,
            Bright_Blue, Bright_Magenta, Bright_Cyan, Bright_White
    };
    string title_color = colors[randDist(mt)];

    string
    title="\n\n      8888888b.                                                                                          .d8888b.   d888          .d8888b.   d888         888    888 888     888         \n"
              "      888   Y88b                                                                                        d88P  Y88b d8888         d88P  Y88b d8888         888    888 888     888         \n"
              "      888    888                                                                                        888    888   888              .d88P   888         888    888 888     888         \n"
              "      888   d88P 888d888 .d88b.   .d88b.  888d888 8888b.  88888b.d88b.   8888b.  888d888 .d88b.         888    888   888             8888\"    888         8888888888 888     888         \n"
              "      8888888P\"  888P\"  d88\"\"88b d88P\"88b 888P\"      \"88b 888 \"888 \"88b     \"88b 888P\"  d8P  Y8b        888    888   888              \"Y8b.   888         888    888 888     888         \n"
              "      888        888    888  888 888  888 888    .d888888 888  888  888 .d888888 888    88888888        888    888   888  888888 888    888   888  888888 888    888 888     888         \n"
              "      888        888    Y88..88P Y88b 888 888    888  888 888  888  888 888  888 888    Y8b.            Y88b  d88P   888         Y88b  d88P   888         888    888 Y88b. .d88P         \n"
              "      888        888     \"Y88P\"   \"Y88888 888    \"Y888888 888  888  888 \"Y888888 888     \"Y8888 88888888 \"Y8888P\"  8888888        \"Y8888P\"  8888888       888    888  \"Y88888P\" 88888888 \n"
              "                                      888                                                                                                                                                \n"
              "                                 Y8b d88P                                                                                                                                                \n"
              "                                  \"Y88P\"\n";

    string separator = "----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\n";
    printf("%s%s %s%s",title_color.c_str() ,title.c_str(), separator.c_str(), Bright_White);

    while (true) {
        title_color = colors[randDist(mt)];
        printf("%s> ",Bright_White);
        if (strcmp(felbuffer, "ee") == 0) break;
        if (fgets(buffer, sizeof(buffer), stdin) != nullptr) {
            buffer[strcspn(buffer, "\n")] = '\0';

            if (strcmp(buffer, "e") == 0) break;
            else if (strcmp(buffer, "cl") == 0) {
                system("CLS");
                printf("%s%s %s",title_color.c_str() ,title.c_str(), separator.c_str());
            }
            else if (strcmp(buffer, "help") == 0 || strcmp(buffer, "?") == 0) {
                printf("%sHelp:\n",Bright_White);
                printf("%scl%s         Clears the screen.\n",Bright_Cyan,Bright_White);
                printf("%se%s          Quits the Programare_01_31_HU_megoldottt.exe program.\n",Bright_Cyan,Bright_White);
                printf("%sfel%s        Opens the feladat selector\n",Bright_Cyan,Bright_White);
                printf("%shelp%s / %s?%s   Provides Help information for commands.\n",Bright_Cyan,Bright_White,Bright_Cyan,Bright_White);
            }
            else if (strcmp(buffer, "fel") == 0)
            {
                while (true) {
                    title_color = colors[randDist(mt)];
                    printf("%sfel> %s",Bright_Cyan,Bright_White);
                    if (fgets(felbuffer, sizeof(felbuffer), stdin) != nullptr) {
                        felbuffer[strcspn(felbuffer, "\n")] = '\0';

                        FEL_REDIRECT:
                        if (strcmp(felbuffer, "e") == 0 || strcmp(felbuffer, "ee") == 0) break;
                        else if (strcmp(felbuffer, "cl") == 0) {
                            system("CLS");
                            printf("%s%s %s",title_color.c_str() ,title.c_str(), separator.c_str());
                        }
                        else if (strcmp(felbuffer, "help") == 0 || strcmp(felbuffer, "?") == 0) {
                            printf("Fel_Help:%s\n",Bright_White);
                            printf("%scl%s         Clears the screen.\n",Bright_Cyan,Bright_White);
                            printf("%se%s          Quits the feladat subprogram.\n",Bright_Cyan,Bright_White);
                            printf("%see%s         Quits the program.\n",Bright_Cyan,Bright_White);
                            printf("%shelp%s / %s?%s   Provides Help information for %sfel%scommands.\n",Bright_Cyan,Bright_White,Bright_Cyan,Bright_White,Bright_Cyan,Bright_White);
                            printf("1D Tomb: %s\n",Bright_White);
                            printf("%s01%s         1. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s02%s         2. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s03%s         3. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s04%s         4. feladat\n",Bright_Cyan,Bright_White);
                            printf("2D Tomb: %s\n",Bright_White);
                            printf("%s11%s         1. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s12%s         2. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s13%s         3. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s14%s         4. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s15%s         5. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s16%s         6. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s17%s         7. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s18%s         8. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s19%s         9. feladat\n",Bright_Cyan,Bright_White);
                            printf("char: %s\n",Bright_White);
                            printf("%s21%s         1. feladat\n",Bright_Cyan,Bright_White);
                            printf("%s22%s         2. feladat\n",Bright_Cyan,Bright_White);
                            printf("BAC_SIM25: %s\n",Bright_White);
                            printf("%sb22%s        BAC_SIM25 II 2.\n",Bright_Cyan,Bright_White);
                        }
                        else if (strcmp(felbuffer, "01") == 0) { fel01(4,30); }
                        else if (strcmp(felbuffer, "02") == 0) { fel02(); }
                        else if (strcmp(felbuffer, "03") == 0) { fel03(); }
                        else if (strcmp(felbuffer, "04") == 0) { fel04(); }
                        else if (strcmp(felbuffer, "11") == 0)
                        {
                            vector<int> arr(16);
                            arr.assign({1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16});
                            fel11(4,arr);

                        }
                        else if (strcmp(felbuffer, "12") == 0)
                        {
                            vector<vector<int>> matrix(4, vector<int>(4));
                            matrix[0]={1 ,1 ,3 ,4};
                            matrix[1]={5 ,6 ,7 ,8};
                            matrix[2]={9 ,9 ,11 ,12};
                            matrix[3]={13 ,14 ,15 ,16};
                            fel12(4,matrix);
                        }
                        else if (strcmp(felbuffer, "13") == 0)
                        {
                            vector<vector<int>> matrix(4, vector<int>(4));
                            matrix[0]={1 ,12 ,13 ,45};
                            matrix[1]={5 ,16 ,7 ,18};
                            matrix[2]={9 ,10 ,11 ,12};
                            matrix[3]={13 ,14 ,15 ,16};
                            fel13(4,matrix);
                        }
                        else if (strcmp(felbuffer, "14") == 0)
                        {
                            vector<vector<int>> matrix(4, vector<int>(5));
                            matrix[0]={1 ,12 ,13 ,45 ,10};
                            matrix[1]={5 ,16 ,7 ,18 ,49};
                            matrix[2]={9 ,50 ,11 ,12 ,25};
                            matrix[3]={13 ,14 ,15 ,16 ,34};
                            fel14(4,5,matrix);
                        }
                        else if (strcmp(felbuffer, "15") == 0)
                        {
                            vector<vector<int>> matrix(4, vector<int>(5));
                            matrix[0]={1 ,12 ,13 ,45 ,10};
                            matrix[1]={5 ,16 ,7 ,18 ,49};
                            matrix[2]={9 ,50 ,11 ,12 ,25};
                            matrix[3]={13 ,14 ,15 ,16 ,34};
                            fel15(4,5,matrix);
                        }
                        else if (strcmp(felbuffer, "16") == 0)
                        {
                            fel16(4);
                        }
                        else if (strcmp(felbuffer, "17") == 0)
                        {
                            fel17(123);
                        }
                        else if (strcmp(felbuffer, "18") == 0)
                        {
                            fel18(4,3);
                        }
                        else if (strcmp(felbuffer, "19") == 0)
                        {
                            fel19(4,5);
                        }
                        else if (strcmp(felbuffer, "21") == 0)
                        {
                            fel21();
                        }
                        else if (strcmp(felbuffer, "22") == 0)
                        {
                            fel22();
                        }
                        else if (strcmp(felbuffer, "23") == 0)
                        {
                            fel23();
                        }
                        else if (strcmp(felbuffer, "b22") == 0) { bac_2_2(); }
                        else if(strcmp(felbuffer, "") == 0) printf("");
                        else {
                            printf("%s'%s%s%s' is not recognized as an internal %sfel%scommand.%s\n",Bright_Red,Bright_White, felbuffer,Bright_Red,Bright_Cyan,Bright_Red,Bright_White);
                        }
                    }
                }
            }
            else if (strcmp(buffer, "") == 0) printf("");
            else if (strcmp(buffer, "fel01") == 0 || strcmp(buffer, "fel02") == 0 || strcmp(buffer, "fel03") == 0 || strcmp(buffer, "fel04") == 0 || strcmp(buffer, "fel05") == 0 ||
                     strcmp(buffer, "fel06") == 0 || strcmp(buffer, "fel07") == 0 || strcmp(buffer, "fel08") == 0 || strcmp(buffer, "fel09") == 0 || strcmp(buffer, "fel10") == 0 ||
                     strcmp(buffer, "fel11") == 0 || strcmp(buffer, "fel12") == 0 || strcmp(buffer, "fel13") == 0 || strcmp(buffer, "fel14") == 0 || strcmp(buffer, "fel15") == 0 ||
                     strcmp(buffer, "fel16") == 0 || strcmp(buffer, "fel17") == 0 || strcmp(buffer, "fel18") == 0 || strcmp(buffer, "fel19") == 0 || strcmp(buffer, "fel20") == 0 ||
                     strcmp(buffer, "fel21") == 0 || strcmp(buffer, "fel22") == 0 || strcmp(buffer, "fel23") == 0 || strcmp(buffer, "fel24") == 0 || strcmp(buffer, "fel25") == 0 ||
                     strcmp(buffer, "fel26") == 0 || strcmp(buffer, "fel27") == 0 || strcmp(buffer, "fel28") == 0 || strcmp(buffer, "fel29") == 0 || strcmp(buffer, "fel30") == 0)
            {
                char c1[10]{};
                strcpy(c1,buffer+3);
                strcpy(felbuffer,c1);
                printf("%s\033[3mRedirecting to %sfel%s%s...\033[0m%s\n\n", White, Bright_Cyan, c1, White,Bright_White);
                goto FEL_REDIRECT;
            }
            else {
                printf("%s'%s%s%s' is not recognized as an internal command.%s\n",Bright_Red,Bright_White, buffer,Bright_Red,Bright_White);
            }
        } else {
            printf("%sError reading input.%s\n",Bright_Red,Bright_White);
        }
    }
}

int main() {

    drawUI();

    //fgetc(stdin);
    //fgetc(stdin);
}
