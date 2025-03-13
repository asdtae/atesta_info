#include <iostream>
#include <fstream>
#include <cstring>

using namespace std;

void unitTests(int nrOfTests)
{
    // [INIT]
    int i,succesfullTests=0;
    char inputFilename[10], expectedFilename[10];
    string error;
    bool error_p=false;
    bool tests[nrOfTests];
    for(i=0; i<nrOfTests; i++)
    {
        tests[i] = false;
    }
    ifstream inputFile;
    ifstream expectedFile;

    strcpy(inputFilename, "input.");
    strcpy(expectedFilename, "output.");

    for(i=0; i<nrOfTests; i++)
    {
        // [BATCH NR]
        if(i<10) cout<<"BATCH: 0"<<i<<endl;
        else cout<<"BATCH: "<<i<<endl;

        // [i to char]
        char batchNr[3];
        if(i<10)
        {
            batchNr[0] = '0';
            batchNr[1] = '0' + i;
        }
        else
        {
            batchNr[0] = '1';
            batchNr[1] = '0' + i % 10;
        }

        // [filename.i]
        strcat(inputFilename, batchNr);
        inputFile.open(inputFilename);

        strcat(expectedFilename, batchNr);
        expectedFile.open(expectedFilename);

        // [PROG INIT]
        int n=0;
        int sets=0; //TODO: a sets-et at kell irni egy tombe melye mindegyik batch-ban kiszamitsa a sikeres/oss aranyt
        int qMuvelet, muveletType;
        float output=0, expectedOutput;
        int v, xu, yu;
        int xq1, yq1, xq2, yq2;

        inputFile >> qMuvelet;

        // [PROG]
        for(int j=1; j<=qMuvelet; j++)
        {
            cout<<"\033[1;36;40m"<<j<<"\033[1;0m: ";

            // [MUVELET TYPE]
            inputFile >> muveletType;
            if(muveletType == 1)
            {
                // [MUVELET TYPE fuggoleges edesıtes]
                inputFile >> xu >> v;
                cout<<muveletType<<' ';
                cout<<xu<<' '<<v<<endl;
            }
            else if(muveletType == 2)
            {
                // [MUVELET TYPE vızszintes edesıtes]
                inputFile >> yu >> v;
                cout<<muveletType<<' ';
                cout<<yu<<' '<<v<<endl;
            }
            else if(muveletType == 3)
            {
                // [MUVELET TYPE ızleles]
                inputFile >> xq1 >> yq1 >> xq2 >> yq2;
                cout<<muveletType<<' ';
                cout<<xq1<<' '<<yq1<<' '<<xq2<<' '<<yq2<<' ';

                expectedFile >> expectedOutput;
                if(output==expectedOutput)
                {
                    sets++;
                    cout<<"\033[1;92;40mSUCCESS\033[1;0m"<<endl;
                }
                else
                {
                    cout<<"\033[1;91;40mERROR\033[1;0m"<<endl;
                }
            }
            else
                // [ERROR]
                cout<<"\033[1;31;40mERROR: \033[1;0m"<<j<<endl;

            // [ERRORS]
            if(xu==362389) error_p=true;
            error= to_string(n);
        }

        // [GET TO EOF]
        while(!inputFile.eof())
        {
            inputFile >> n;
        }

        // [ERRORS]
        if(error_p)
        {
            cout << "\033[1;31;40m" << "ERROR CODE: \033[1;0m" << error << "\033[1;31;40m" << " IN BATCH: \033[1;0m" << batchNr << endl;
            break;
        }

        // [TEST RESULTS SET]
        if(inputFile.eof())
        {
            tests[i]=true;
            inputFile.close();
            expectedFile.close();
            succesfullTests++;
        }
        else
        {
            inputFile.close();
            expectedFile.close();
        }

        strcpy(inputFilename, "input.");
        strcpy(expectedFilename, "output.");
    }

    cout<<"__________________"<<endl<<endl;

    // [TEST RESULTS]
    for(i=0; i<nrOfTests; i++)
    {
        // [BATCH NR]
        if(i<10) cout<<"BATCH: 0"<<i<<' ';
        else cout<<"BATCH: "<<i<<' ';

        if(tests[i])
        {
            cout<<"\033[1;32;40m"<<"SUCCESS"<<endl;
        }
        else
        {
            cout<<"\033[1;31;40m"<<"FAILED"<<endl;
        }
        cout<<"\033[1;0m";
    }

    // [TEST RESULT COMPACT]
    if(succesfullTests == nrOfTests) cout << "\033[1;0m" << succesfullTests << "\033[1;32;40m out of \033[1;0m" << nrOfTests << "\033[1;32;40m tests succeeded.";
    else cout << "\033[1;0m" << succesfullTests << "\033[1;31;40m out of \033[1;0m" << nrOfTests << "\033[1;31;40m tests succeeded.";
}

int main()
{
    unitTests(1);

    fgetc(stdin);
}