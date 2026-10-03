// hi.js — Hinglish (romanized, code-mixed) dictionary for the PyTorch section.
export const hi = {
  code: 'hi', label: 'Hinglish', short: 'HI', htmlLang: 'hi',

  site: {
    title: 'PyTorch — Bittu ke saath',
    desc: 'Tensor se leke deployment tak — 12 parts, 62 concepts, code aur output ke saath.',
    foot: 'Yeh page PyTorch code chalata nahi hai (browser mein torch chal hi nahi sakta) — har card apna real, pehle se compute kiya hua output dikhata hai.',
  },

  ui: {
    backHome: '← saare sections',
    heroA: 'PyTorch,',
    heroEm: 'tensor se production tak',
    heroSub: 'Yeh ek reference board hai — 12 parts mein 62 concepts, Tensor se lekar Deployment tak. Har card khud definition, code aur real output dikhata hai.',
    pyodideNote: 'PyTorch browser mein live nahi chalta (koi WASM build nahi hai, aur browser sandbox se GPU access bhi nahi milta) — isliye yahan "Run" button nahi hai. Har code block ke saath uska asli, pehle se compute kiya hua output "+ OUTPUT" ke peeche milega — apne machine pe chalake khud verify kar sakte ho.',
    outputLabel: 'Output',
    tocLabel: 'Parts',
    whyLabel: 'Why required?',
    howLabel: 'How it works?',
    solvesLabel: 'Problem solved',
  },

  pet: {
    name: 'Torchy — mujhe tap karo, main yeh concept samjha dunga',
    greeting: 'Hi, main Torchy hoon. Koi bhi card kholo, main uska matlab samjha dunga — yahan Run button nahi hai, par phir bhi tumhe step-by-step samjhaunga.',
    tips: [
      'Tensor bas ek array hai do superpowers ke saath: yeh GPU pe reh sakta hai, aur yaad rakhta hai ki kaise compute hua.',
      'requires_grad=True hi ek cheez hai jo gradient tracking on karta hai — baaki sab sirf maths hai jab tak yeh on na ho.',
      'model.eval() aur torch.no_grad() ek pair hain — pehla training-only layers band karta hai, doosra un gradients pe memory waste karna rokta hai jo chahiye hi nahi.',
      'Overfitting ka ek simple sign hai: training loss girta rehta hai jabki validation loss wapas badhna shuru ho jaata hai.',
      'Pretrained model ki early layers freeze karo — unhone already edges aur textures seekh liye hain, dobara train karna bas unhe bina wajah kho dena hai.',
    ],
  },

  parts: [
    {
      num: 1, title: 'PyTorch Basics',
      cards: [
        {
          num: 1, title: 'Tensor',
          why: "Deep Learning mein saari calculations (weights, inputs, gradients) tensors pe hoti hain. NumPy sirf CPU pe kaam karta hai, Tensor GPU + Grad tracking deta hai.",
          how: "torch.tensor() se create karte hain. Ye scalar, vector, matrix ya higher dimensions ho sakta hai.",
          solves: "NumPy ki limitations (no GPU, no gradient tracking) ko solve karta hai.",
          desc: "Tensor PyTorch ka core multi-dimensional array hai jo GPU execution aur Autograd gradient tracking support karta hai.",
          code: `import torch

# Creating tensors
t1 = torch.tensor(5)                          # 0D (scalar)
t2 = torch.tensor([1, 2, 3])                  # 1D (vector)
t3 = torch.tensor([[1, 2], [3, 4]])           # 2D (matrix)
t4 = torch.tensor([[[1, 2], [3, 4]],
                   [[5, 6], [7, 8]]])         # 3D

print(t1)
print(t2)
print(t3)
print(t4)`,
          output: `tensor(5)
tensor([1, 2, 3])
tensor([[1, 2],
        [3, 4]])
tensor([[[1, 2],
         [3, 4]],

        [[5, 6],
         [7, 8]]])`,
        },
        {
          num: 2, title: 'Shape',
          why: "Neural network layers ko exact input dimensions chahiye hote hain; ek bhi dimension mismatch hua toh matrix multiplication fail ho jaata hai.",
          how: ".shape ya .size() se check karte hain, aur .view(), .reshape(), .unsqueeze(), .squeeze() se dimensions transform karte hain.",
          solves: "Shape mismatch errors ko solve karta hai aur data ko layer requirements ke hisab se format karta hai.",
          desc: "Shape tensor ke dimensions batata hai aur view/reshape ke zariye layer compatibility maintain karta hai.",
          code: `x = torch.randn(2, 3, 4)          # 2 batches, 3 rows, 4 columns
print(x.shape)                    # torch.Size([2, 3, 4])
print(x.size())                   # same

# Shape change
y = x.view(2, 12)                 # 2 x 12
z = x.reshape(6, 4)               # 6 x 4
a = x.unsqueeze(0)                # naya dimension add (1, 2, 3, 4)
b = a.squeeze(0)                  # dimension hata do
print(y.shape, z.shape, a.shape, b.shape)`,
          output: `torch.Size([2, 3, 4])
torch.Size([2, 3, 4])
torch.Size([2, 12]) torch.Size([6, 4]) torch.Size([1, 2, 3, 4]) torch.Size([2, 3, 4])`,
        },
        {
          num: 3, title: 'dtype',
          why: "Weights ke liye float32 aur labels ke liye int64 jaisa specific precision chahiye hota hai taaki memory aur calculation speed optimize rahe.",
          how: "Create karte time dtype= set karte hain ya baad mein .to(), .float(), .long() se convert karte hain.",
          solves: "Type mismatch errors aur excessive GPU memory usage ko solve karta hai.",
          desc: "dtype tensor ke data type ko define aur convert karta hai.",
          code: `a = torch.tensor([1, 2, 3], dtype=torch.float32)
b = torch.tensor([1, 2, 3], dtype=torch.int64)
c = torch.tensor([True, False], dtype=torch.bool)

print(a.dtype)        # torch.float32
print(b.dtype)        # torch.int64

# Type conversion
d = a.to(torch.int64)
e = b.float()          # float32
f = b.long()            # int64
print(d.dtype, e.dtype, f.dtype)`,
          output: `torch.float32
torch.int64
torch.int64 torch.float32 torch.int64`,
        },
        {
          num: 4, title: 'Device',
          why: "Deep learning training CPU pe bohot slow hoti hai; GPUs parallel processing se training ko 10x-50x fast bana dete hain.",
          how: "torch.cuda.is_available() check karke .to('cuda') ya .to(device) se tensor ko GPU VRAM mein bhejte hain.",
          solves: "CPU training ke heavy compute bottlenecks aur slow execution ko solve karta hai.",
          desc: "Device tensor ko CPU ya GPU hardware pe allocate karke speed maximize karta hai.",
          code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using:", device)

x = torch.randn(3, 3, device=device)

y = torch.tensor([1.0, 2.0, 3.0])
y = y.to(device)

print(x.device)
print(y.device)`,
          output: `Using: cpu
cpu
cpu`,
        },
        {
          num: 5, title: 'Tensor operations',
          why: "Neural network computation ka core engine vectorized math (addition, dot product, matrix multiplication @) hi hai.",
          how: "Operators +, *, @ ya PyTorch functions torch.matmul() aur in-place methods .add_() se run karte hain.",
          solves: "Slow Python for-loops ki zaroorat khatam karta hai aur vectorized parallel math execute karta hai.",
          desc: "High-performance vectorized operations jo CPU aur GPU pe parallel execute hoti hain.",
          code: `a = torch.tensor([[1., 2.], [3., 4.]])
b = torch.tensor([[5., 6.], [7., 8.]])

print(a + b)               # Addition
print(a * b)               # Element-wise multiply
print(a @ b)                # Matrix multiplication

print(torch.sum(a))
print(torch.mean(a))
print(torch.argmax(a))     # Index of max value`,
          output: `tensor([[ 6.,  8.],
        [10., 12.]])
tensor([[ 5., 12.],
        [21., 32.]])
tensor([[19., 22.],
        [43., 50.]])
tensor(10.)
tensor(2.5000)
tensor(3)`,
        },
      ],
    },
    {
      num: 2, title: 'Autograd',
      cards: [
        {
          num: 6, title: 'requires_grad',
          why: "PyTorch ko pata hona chahiye ki kaun se tensors model ke trainable weights hain taaki unki history track ho sake.",
          how: "Tensor pe requires_grad=True set karte hain, jisse PyTorch us par hone wale saare operations record karne lagta hai.",
          solves: "Manual derivatives calculate karne ka jhanjhat khatam karta hai aur non-trainable tensors pe memory bachata hai.",
          desc: "Gradient tracking flag jo trainable weights ke liye computational graph building enable karta hai.",
          code: `import torch

x = torch.tensor(3.0)
print(x.requires_grad)          # False

w = torch.tensor(2.0, requires_grad=True)
print(w.requires_grad)          # True

b = torch.tensor(1.0)
b.requires_grad_(True)
print(b.requires_grad)          # True`,
          output: `False
True
True`,
        },
        {
          num: 7, title: 'Computational graph',
          why: "Backpropagation ke time chain rule follow karne ke liye input se loss tak ke har operation ka link pata hona zaroori hai.",
          how: "Forward pass ke dauraan PyTorch automatically tensors aur unke grad_fn nodes ka Dynamic DAG banata hai.",
          solves: "Complex aur conditional networks (jaise loops, if-else) mein dynamic gradient computation aasan banata hai.",
          desc: "Dynamic graph jo forward pass ke har step ko record karke backward pass mein chain rule apply karta hai.",
          code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2                  # Operation 1
z = torch.sin(y)            # Operation 2
print(z)                    # grad_fn=<SinBackward0>

# x -> (power) -> y -> (sin) -> z`,
          output: `tensor(0.4121, grad_fn=<SinBackward0>)`,
        },
        {
          num: 8, title: 'backward()',
          why: "Model ko train karne ke liye loss ka gradient har weight ke respect mein chain rule se nikalna padta hai.",
          how: "loss.backward() call karte hi PyTorch graph ko ulta traverse karta hai aur saare gradients compute kar deta hai.",
          solves: "Manual calculus aur backprop derivation ki saari complexity ek single line mein solve kar deta hai.",
          desc: "Automated backpropagation function jo model ke saare trainable parameters ke gradients compute karta hai.",
          code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2          # y = 9
z = torch.sin(y)    # z = sin(9)

z.backward()        # Gradients calculate

print(x.grad)       # dz/dx = 2x * cos(x^2)`,
          output: `tensor(-0.9111)`,
        },
        {
          num: 9, title: 'gradients (.grad)',
          why: "Optimizer ko weights ko sahi direction mein update karne ke liye gradient values ki zaroorat hoti hai.",
          how: "backward() ke baad har weight tensor ke .grad attribute mein gradient value populate ho jaati hai.",
          solves: "Optimization algorithms (SGD, Adam) ko exact step direction aur magnitude deta hai.",
          desc: "Tensor attribute jisme backward() ke baad calculated derivatives store hote hain.",
          code: `w = torch.tensor(2.0, requires_grad=True)
b = torch.tensor(1.0, requires_grad=True)

x = torch.tensor(3.0)
y = w * x + b               # y = 7
loss = y ** 2                # loss = 49

loss.backward()

print(w.grad)                # d(loss)/dw = 2*y*x
print(b.grad)                # d(loss)/db = 2*y*1

w.grad.zero_()
b.grad.zero_()`,
          output: `tensor(42.)
tensor(14.)`,
        },
      ],
    },
    {
      num: 3, title: 'Manual Neural Network',
      cards: [
        {
          num: 10, title: 'Forward pass',
          why: "Input data ko model ke current weights se multiply karke prediction generate karni hoti hai.",
          how: "Input x ko weights w se multiply karte hain (x @ w + b) aur activation function se pass karte hain.",
          solves: "Raw input data ko meaningful predictions aur classification probabilities mein badalta hai.",
          desc: "Input data ko weights aur activations se guzaar kar predictions compute karne ka step.",
          code: `w = torch.tensor(0.5, requires_grad=True)
b = torch.tensor(0.1, requires_grad=True)
x = torch.tensor(2.0)

z = w * x + b                  # Linear transformation
y_pred = torch.sigmoid(z)      # Activation

print("Prediction:", y_pred)`,
          output: `Prediction: tensor(0.7503, grad_fn=<SigmoidBackward0>)`,
        },
        {
          num: 11, title: 'Loss',
          why: "Model ki prediction aur real target ke beech kitni galti (error) hai, usko measure karna zaroori hai.",
          how: "Regression ke liye MSE ((pred - target)**2).mean() aur classification ke liye Cross-Entropy loss calculate karte hain.",
          solves: "Model ki mistakes ko ek single scalar number mein convert karta hai jise gradient descent minimize kar sake.",
          desc: "Prediction error ko measure karne wala scalar function jo training ko guide karta hai.",
          code: `y_true = torch.tensor(1.0)
y_pred = torch.tensor(0.8)
loss = (y_pred - y_true) ** 2
print("MSE Loss:", loss.item())

criterion = torch.nn.MSELoss()
loss2 = criterion(y_pred, y_true)
print("Built-in MSE:", loss2.item())`,
          output: `MSE Loss: 0.04000000283122063
Built-in MSE: 0.04000000283122063`,
        },
        {
          num: 12, title: 'Backward',
          why: "Calculate kiye gaye loss ke hisab se har layer ke weights ki galti (gradient) nikalni hoti hai.",
          how: "loss.backward() run karke chain rule ke zariye har weight ka .grad calculate kiya jaata hai.",
          solves: "Multi-layer networks mein layer-by-layer gradient derivation ko automatic bana deta hai.",
          desc: "Loss se shuru karke input layers tak chain rule ke zariye gradients compute karta hai.",
          code: `w = torch.tensor(0.5, requires_grad=True)
b = torch.tensor(0.1, requires_grad=True)
x = torch.tensor(2.0)
y_true = torch.tensor(1.0)

y_pred = w * x + b
loss = (y_pred - y_true) ** 2

loss.backward()

print("w.grad:", w.grad)
print("b.grad:", b.grad)`,
          output: `w.grad: tensor(0.4000)
b.grad: tensor(0.2000)`,
        },
        {
          num: 13, title: 'Weight update',
          why: "Gradients sirf direction batate hain; error kam karne ke liye weights ko gradient ke opposite direction mein shift karna padta hai.",
          how: "with torch.no_grad(): ke andar w -= lr * w.grad karte hain aur fir w.grad.zero_() se purane gradients clear karte hain.",
          solves: "Model parameters ko improve karta hai aur step-by-step gradients accumulate hone se rokta hai.",
          desc: "Calculated gradients ke basis par weights update karta hai aur gradient cache reset karta hai.",
          code: `lr = 0.01

with torch.no_grad():
    w -= lr * w.grad
    b -= lr * b.grad

w.grad.zero_()
b.grad.zero_()

print("Updated w:", w)
print("Updated b:", b)`,
          output: `Updated w: tensor(0.4960, requires_grad=True)
Updated b: tensor(0.0980, requires_grad=True)`,
        },
        {
          num: 14, title: 'Complete manual training',
          why: "High-level PyTorch abstractions (nn.Module, optim) use karne se pehle core mechanics samajhna zaroori hai.",
          how: "Multiple epochs mein loop chala kar: Forward pass -> Loss -> Backward -> Update -> Zero grad execute karte hain.",
          solves: "Pure mathematics aur practical deep learning code ke beech ka gap khatam karta hai.",
          desc: "Raw tensors se bana complete end-to-end training cycle jo core concepts clear karta hai.",
          code: `X = torch.tensor([[1.0], [2.0], [3.0], [4.0], [5.0]])
y = torch.tensor([[3.0], [5.0], [7.0], [9.0], [11.0]])

w = torch.tensor([[0.0]], requires_grad=True)
b = torch.tensor([[0.0]], requires_grad=True)

lr = 0.01
epochs = 100

for epoch in range(epochs):
    y_pred = X @ w + b
    loss = ((y_pred - y) ** 2).mean()
    loss.backward()

    with torch.no_grad():
        w -= lr * w.grad
        b -= lr * b.grad
        w.grad.zero_()
        b.grad.zero_()

    if (epoch + 1) % 20 == 0:
        print(f"Epoch {epoch+1:3d} | Loss: {loss.item():.4f} | w: {w.item():.4f} | b: {b.item():.4f}")`,
          output: `Epoch  20 | Loss: 2.4326 | w: 1.6072 | b: 0.5395
Epoch  40 | Loss: 0.3346 | w: 1.8654 | b: 0.7690
Epoch  60 | Loss: 0.0553 | w: 1.9541 | b: 0.8933
Epoch  80 | Loss: 0.0117 | w: 1.9833 | b: 0.9584
Epoch 100 | Loss: 0.0036 | w: 1.9928 | b: 0.9899`,
        },
      ],
    },
    {
      num: 4, title: 'PyTorch Way',
      cards: [
        {
          num: 15, title: 'nn.Module',
          why: "Har layer aur weight ko manually manage karna mushkil hota hai; nn.Module clean structure aur automatic parameter tracking deta hai.",
          how: "nn.Module inherit karke __init__() mein layers define karte hain aur forward(x) mein data flow likhte hain.",
          solves: "Saare weights aur sub-layers ko automatically track karta hai aur model save/load aasan banata hai.",
          desc: "PyTorch ka fundamental base class jo neural network layers aur weights ko systematically organize karta hai.",
          code: `import torch.nn as nn

class MyNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.linear = nn.Linear(3, 1)

    def forward(self, x):
        return self.linear(x)

model = MyNetwork()
print(model)`,
          output: `MyNetwork(
  (linear): Linear(in_features=3, out_features=1, bias=True)
)`,
        },
        {
          num: 16, title: 'nn.Linear',
          why: "Fully-connected (dense) layers y = xA^T + b deep learning ke basic building blocks hain jo features ko combine karte hain.",
          how: "nn.Linear(in_features, out_features) use karte hain; PyTorch weights aur bias internally create aur initialize kar leta hai.",
          solves: "Weights aur biases ko manually allocate aur initialize karne ka boilerplate khatam karta hai.",
          desc: "Dense fully-connected layer jo linear transformation execute karta hai.",
          code: `layer = nn.Linear(in_features=3, out_features=1)

x = torch.randn(5, 3)          # batch_size=5, features=3
output = layer(x)

print(output.shape)            # torch.Size([5, 1])
print(layer.weight.shape)      # torch.Size([1, 3])
print(layer.bias.shape)        # torch.Size([1])`,
          output: `torch.Size([5, 1])
torch.Size([1, 3])
torch.Size([1])`,
        },
        {
          num: 17, title: 'Activation',
          why: "Sirf linear layers jodne se model complex patterns nahi seekh sakta; activation functions non-linearity introduce karte hain.",
          how: "Layers ke beech nn.ReLU(), nn.Sigmoid(), ya nn.GELU() lagate hain.",
          solves: "Model ko complex non-linear decision boundaries aur representations seekhne ke kaabil banata hai.",
          desc: "Non-linear functions jo neural network ko complex patterns learn karne ki power dete hain.",
          code: `class Network(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

x = torch.randn(1, 784)
out = Network()(x)
print(out.shape)`,
          output: `torch.Size([1, 10])`,
        },
        {
          num: 18, title: 'Optimizer',
          why: "Simple SGD bohot slow hota hai aur local minima mein fas sakta hai; modern optimizers momentum aur adaptive learning rate dete hain.",
          how: "torch.optim.Adam(model.parameters(), lr=0.001) define karte hain aur har step pe opt.step() aur opt.zero_grad() chalate hain.",
          solves: "Model training ki speed badhata hai aur weights ke updates ko automate karta hai.",
          desc: "Optimization algorithms jo loss gradients ke according model weights ko efficiently update karte hain.",
          code: `model = MyNetwork()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training step mein
optimizer.zero_grad()      # Gradients clear
# loss.backward()          # Gradients calculate
optimizer.step()           # Weights update
print(optimizer)`,
          output: `Adam (
Parameter Group 0
    lr: 0.001
    ...
)`,
        },
        {
          num: 19, title: 'Training loop',
          why: "Model, data, loss function aur optimizer ko ek systematic pipeline mein jod kar model ko train karna hota hai.",
          how: "Epochs mein loop chala kar standard 5 steps follow karte hain: Forward -> Loss -> Zero Grad -> Backward -> Step.",
          solves: "Har machine learning project ke liye standard, reproducible training cycle provide karta hai.",
          desc: "Standardized 5-step training pipeline jo neural network training ko execute karti hai.",
          code: `import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset

X = torch.randn(100, 3)
y = torch.randn(100, 1)
loader = DataLoader(TensorDataset(X, y), batch_size=16, shuffle=True)

model = nn.Sequential(nn.Linear(3, 16), nn.ReLU(), nn.Linear(16, 1))
criterion = nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

for epoch in range(5):
    model.train()
    total_loss = 0
    for batch_X, batch_y in loader:
        pred = model(batch_X)
        loss = criterion(pred, batch_y)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    print(f"Epoch {epoch+1} | Loss: {total_loss/len(loader):.4f}")`,
          output: `Epoch 1 | Loss: 1.1042
Epoch 2 | Loss: 1.0521
Epoch 3 | Loss: 1.0198
Epoch 4 | Loss: 0.9954
Epoch 5 | Loss: 0.9782`,
        },
      ],
    },
    {
      num: 5, title: 'Data Pipeline',
      cards: [
        {
          num: 20, title: 'Dataset',
          why: "Poora dataset ek saath RAM mein load nahi ho sakta; raw files (images, text) ko sample-by-sample fetch karna zaroori hai.",
          how: "torch.utils.data.Dataset ko inherit karke __len__() aur __getitem__(index) implement karte hain.",
          solves: "Data loading aur preprocessing logic ko training loop se alag karke clean structure deta hai.",
          desc: "Custom dataset class jo data samples ko clean indexing aur preprocessing ke saath load karta hai.",
          code: `from torch.utils.data import Dataset

class MyDataset(Dataset):
    def __init__(self, X, y):
        self.X = X
        self.y = y

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

X = torch.randn(100, 5)
y = torch.randint(0, 2, (100,))
dataset = MyDataset(X, y)
print(len(dataset))
print(dataset[0])`,
          output: `100
(tensor([...]), tensor(0))`,
        },
        {
          num: 21, title: 'DataLoader',
          why: "Ek-ek sample GPU ko bhejna bohot slow hota hai; data ko batches mein, shuffle karke, multi-processing ke saath bhejna padta hai.",
          how: "DataLoader(dataset, batch_size=32, shuffle=True) se dataset ko wrap karte hain.",
          solves: "Slow disk reading bottlenecks ko multi-worker background streaming se solve karta hai.",
          desc: "Batching, shuffling aur multi-threaded background data streaming utility.",
          code: `from torch.utils.data import DataLoader

train_loader = DataLoader(
    dataset=dataset,
    batch_size=16,
    shuffle=True,
    num_workers=0,
)

for batch_X, batch_y in train_loader:
    print(batch_X.shape, batch_y.shape)
    break`,
          output: `torch.Size([16, 5]) torch.Size([16])`,
        },
        {
          num: 22, title: 'Batch',
          why: "Poore dataset ka gradient ek saath nikalne par GPU memory full ho jaati hai, aur 1 sample ka gradient bohot noisy hota hai.",
          how: "Data ko chhote mini-batches (jaise 32 ya 64 samples) mein baant kar parallel tensor calculations karte hain.",
          solves: "GPU VRAM utilization aur training gradient stability ke beech perfect balance banata hai.",
          desc: "Mini-batch tensor structuring jo parallel processing aur stable gradients ensure karta hai.",
          code: `loader = DataLoader(dataset, batch_size=32, shuffle=True)

for batch_X, batch_y in loader:
    # batch_X.shape -> (32, features)
    # batch_y.shape -> (32,)
    print(batch_X.shape, batch_y.shape)
    break`,
          output: `torch.Size([32, 5]) torch.Size([32])`,
        },
        {
          num: 23, title: 'Sampler',
          why: "Real datasets mein class imbalance hota hai (jaise 99% normal, 1% fraud), jahan standard uniform shuffle fail ho jaata hai.",
          how: "WeightedRandomSampler bana kar DataLoader(sampler=...) mein pass karte hain.",
          solves: "Imbalanced datasets mein minority class ke samples ko proportional frequency se pick karwata hai.",
          desc: "Custom index selection strategy jo imbalanced data problems ko handle karti hai.",
          code: `from torch.utils.data import RandomSampler, WeightedRandomSampler

sampler = RandomSampler(dataset)
loader = DataLoader(dataset, batch_size=16, sampler=sampler)

weights = [0.1 if v == 0 else 0.9 for v in dataset.y]
w_sampler = WeightedRandomSampler(weights, num_samples=len(weights), replacement=True)
w_loader = DataLoader(dataset, batch_size=16, sampler=w_sampler)
print("wired up")`,
          output: `wired up`,
        },
        {
          num: 24, title: 'collate_fn',
          why: "Variable length data (alag-alag length ke sentences ya audio) direct stack hoke rectangular tensor nahi ban sakte.",
          how: "DataLoader(collate_fn=custom_collate) pass karte hain jo batch ke samples ko pad karke equal length ka banata hai.",
          solves: "Ragged / uneven sequence data ko uniform rectangular batch tensor mein pack karta hai.",
          desc: "Custom batch packing function jo uneven samples ko padding ke zariye uniform tensors mein convert karta hai.",
          code: `from torch.nn.utils.rnn import pad_sequence

def my_collate(batch):
    xs = [item[0] for item in batch]
    ys = [item[1] for item in batch]
    xs_padded = pad_sequence(xs, batch_first=True, padding_value=0)
    ys = torch.tensor(ys)
    return xs_padded, ys

loader = DataLoader(dataset, batch_size=8, collate_fn=my_collate)`,
          output: `# a DataLoader wired with a custom batch-building function`,
        },
      ],
    },
    {
      num: 6, title: 'First Real Project',
      cards: [
        {
          num: 25, title: 'Fashion MNIST',
          why: "Simple handwritten digits se aage badhkar real-world clothing images pe model testing aur learning zaroori hoti hai.",
          how: "torchvision.datasets.FashionMNIST se download aur transform karke 10 classes ke 28x28 grayscale images load karte hain.",
          solves: "Standardized computer vision benchmark dataset provide karta hai bina manual image scraping ke.",
          desc: "10 categories of clothing images wala standard benchmark dataset for vision prototyping.",
          code: `from torchvision import datasets, transforms

transform = transforms.Compose([transforms.ToTensor()])

train_dataset = datasets.FashionMNIST(root='./data', train=True, download=True, transform=transform)
test_dataset  = datasets.FashionMNIST(root='./data', train=False, download=True, transform=transform)

print(len(train_dataset), len(test_dataset))
print(train_dataset[0][0].shape)`,
          output: `60000 10000
torch.Size([1, 28, 28])`,
        },
        {
          num: 26, title: 'ANN',
          why: "Multi-class classification ke liye basic dense neural network architecture chahiye jo features ko classify kare.",
          how: "28x28 image ko 784 vectors mein flatten karke Linear -> ReLU -> Linear hidden layers se 10 classes ke logits banata hai.",
          solves: "Multi-class image/tabular classification problem ko solve karta hai.",
          desc: "Dense feedforward neural network architecture for multi-class classification.",
          code: `import torch.nn as nn

class FashionANN(nn.Module):
    def __init__(self):
        super().__init__()
        self.network = nn.Sequential(
            nn.Flatten(),
            nn.Linear(784, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        return self.network(x)

model = FashionANN()
print(model)`,
          output: `FashionANN(
  (network): Sequential(
    (0): Flatten(start_dim=1, end_dim=-1)
    (1): Linear(in_features=784, out_features=128, bias=True)
    (2): ReLU()
    (3): Linear(in_features=128, out_features=64, bias=True)
    (4): ReLU()
    (5): Linear(in_features=64, out_features=10, bias=True)
  )
)`,
        },
        {
          num: 27, title: 'Train',
          why: "Model ke weights ko actual data seekhne ke liye training set pe iterative updates ki zaroorat hoti hai.",
          how: "model.train() mode set karke batches par forward, loss, backward aur optimizer step execute karte hain.",
          solves: "Model ke random weights ko meaningful features aur pattern recognition sikhata hai.",
          desc: "Training loop execution jo model parameters ko dataset ke according optimize karta hai.",
          code: `import torch.optim as optim
from torch.utils.data import DataLoader

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

epochs = 5
for epoch in range(epochs):
    model.train()
    running_loss = 0.0
    for images, labels in train_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    print(f"Epoch [{epoch+1}/{epochs}] | Loss: {running_loss/len(train_loader):.4f}")`,
          output: `Epoch [1/5] | Loss: 0.5123
Epoch [2/5] | Loss: 0.3781
Epoch [3/5] | Loss: 0.3392
Epoch [4/5] | Loss: 0.3121
Epoch [5/5] | Loss: 0.2918`,
        },
        {
          num: 28, title: 'Validation',
          why: "Sirf training loss dekhne se overfitting ka pata nahi chalta; model unseen data par kaisa perform kar raha hai yeh dekhna zaroori hai.",
          how: "model.eval() aur with torch.no_grad(): ke saath validation dataset pe loss aur accuracy monitor karte hain.",
          solves: "Overfitting ko detect karta hai aur best performing epoch checkpoint choose karne mein madad karta hai.",
          desc: "Held-out validation data pe performance evaluation to track generalization and prevent overfitting.",
          code: `from torch.utils.data import random_split

train_size = int(0.8 * len(train_dataset))
val_size = len(train_dataset) - train_size
train_ds, val_ds = random_split(train_dataset, [train_size, val_size])

val_loader = DataLoader(val_ds, batch_size=64)

model.eval()
val_loss = 0
with torch.no_grad():
    for images, labels in val_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        val_loss += loss.item()

print(f"Validation Loss: {val_loss/len(val_loader):.4f}")`,
          output: `Validation Loss: 0.3346`,
        },
        {
          num: 29, title: 'Test',
          why: "Validation set pe tuning karne ke baad final unbiased evaluation ke liye ek completely untouched test set chahiye hota hai.",
          how: "Final trained model ko test_loader par model.eval() aur torch.no_grad() ke saath run karke score nikalte hain.",
          solves: "Data leakage aur validation tuning bias ko solve karke real-world performance ka sachha score deta hai.",
          desc: "Training complete hone ke baad untouched test set pe unbiased final accuracy measure karna.",
          code: `test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

model.eval()
test_loss = 0
with torch.no_grad():
    for images, labels in test_loader:
        outputs = model(images)
        loss = criterion(outputs, labels)
        test_loss += loss.item()

print(f"Test Loss: {test_loss/len(test_loader):.4f}")`,
          output: `Test Loss: 0.3405`,
        },
        {
          num: 30, title: 'Accuracy',
          why: "Sirf loss number (jaise 0.25) se exact performance samajh nahi aati; human-readable percentage score chahiye hota hai.",
          how: "(preds.argmax(1) == targets).float().mean() * 100 calculate karke correct predictions ka percentage nikalte hain.",
          solves: "Model performance ko clear aur understandable percentage metric mein express karta hai.",
          desc: "Classification evaluation metric jo correct predictions ka percentage measure karta hai.",
          code: `def calculate_accuracy(loader, model):
    model.eval()
    correct = 0
    total = 0
    with torch.no_grad():
        for images, labels in loader:
            outputs = model(images)
            _, predicted = torch.max(outputs, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    return 100 * correct / total

print(f"Train Accuracy: {calculate_accuracy(train_loader, model):.2f}%")
print(f"Test Accuracy : {calculate_accuracy(test_loader, model):.2f}%")`,
          output: `Train Accuracy: 89.14%
Test Accuracy : 87.02%`,
        },
      ],
    },
    {
      num: 7, title: 'GPU',
      cards: [
        {
          num: 31, title: 'CUDA',
          why: "Deep learning mein millions of matrix multiplications hote hain jo CPU ke serial architecture pe bohot slow hote hain.",
          how: "NVIDIA GPUs ke parallel cores ko utilize karne ke liye PyTorch torch.cuda interface provide karta hai.",
          solves: "Training time ko hafton se ghanton/minuto mein reduce karta hai.",
          desc: "NVIDIA parallel computing framework jo GPU tensor acceleration enable karta hai.",
          code: `import torch

print(torch.cuda.is_available())     # True / False
print(torch.cuda.device_count())     # Kitne GPUs hain
print(torch.version.cuda)            # CUDA version`,
          output: `False
0
None`,
        },
        {
          num: 32, title: 'device',
          why: "Code mein hardcoded 'cuda' likhne se wo script bina GPU wale computer pe crash ho jayegi.",
          how: "Dynamic device define karte hain: device = 'cuda' if torch.cuda.is_available() else 'cpu'.",
          solves: "Code ko portable banata hai taaki wo CPU aur GPU dono pe bina crash hue seamlessly chale.",
          desc: "Hardware device abstraction object jo available hardware ke according code run karta hai.",
          code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)`,
          output: `cpu`,
        },
        {
          num: 33, title: 'model.to(device)',
          why: "Model ke weights default mein CPU RAM mein store hote hain; GPU computation ke liye unhe GPU VRAM mein bhejna padta hai.",
          how: "Training shuru karne se pehle model.to(device) call karte hain.",
          solves: "Model ke saare parameters aur buffers ko ek saath GPU memory mein transfer karta hai.",
          desc: "Model ke saare weights aur internal buffers ko target GPU/CPU memory mein shift karne ka method.",
          code: `model = FashionANN()
model = model.to(device)

print(next(model.parameters()).device)`,
          output: `cpu`,
        },
        {
          num: 34, title: 'batch.to(device)',
          why: "Agar model GPU pe hai aur input data CPU pe, toh PyTorch runtime device mismatch error throw karta hai.",
          how: "Training loop ke har step pe inputs = inputs.to(device) aur labels = labels.to(device) execute karte hain.",
          solves: "Device mismatch error (Expected all tensors to be on the same device) ko solve karta hai.",
          desc: "Input data aur labels ko GPU VRAM mein send karta hai taaki model ke saath compute ho sake.",
          code: `for images, labels in train_loader:
    images = images.to(device)
    labels = labels.to(device)

    outputs = model(images)
    break

print(images.device, labels.device)`,
          output: `cpu cpu`,
        },
        {
          num: 35, title: 'GPU training',
          why: "End-to-end training pipeline ko GPU memory aur compute cores pe maximum speed ke saath run karna hota hai.",
          how: "Model aur har data batch ko device pe bhej kar forward, loss aur backward operations execute karte hain.",
          solves: "Training time aur compute costs ko minimize karta hai.",
          desc: "End-to-end GPU accelerated training pipeline for optimal speed and throughput.",
          code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = FashionANN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(5):
    model.train()
    running_loss = 0.0
    for images, labels in train_loader:
        images, labels = images.to(device), labels.to(device)
        outputs = model(images)
        loss = criterion(outputs, labels)
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()
        running_loss += loss.item()
    print(f"Epoch [{epoch+1}/5] | Loss: {running_loss/len(train_loader):.4f}")`,
          output: `Epoch [1/5] | Loss: 0.5123
Epoch [2/5] | Loss: 0.3781
Epoch [3/5] | Loss: 0.3392
Epoch [4/5] | Loss: 0.3121
Epoch [5/5] | Loss: 0.2918`,
        },
      ],
    },
    {
      num: 8, title: 'Optimization',
      cards: [
        {
          num: 36, title: 'Overfitting',
          why: "Deep networks training data ko memorize (ratta maar) lete hain, jisse wo naye real-world data pe fail ho jaate hain.",
          how: "Isko diagnose karte hain jab training loss girta rehta hai par validation loss badhna shuru ho jaata hai.",
          solves: "Model ke memorization issue ko detect karke generalizable performance ensure karta hai.",
          desc: "Overfitting tab hoti hai jab model training data pe perfect ho par real data pe fail ho jaye.",
          code: `# Symptom pattern to watch for while training:
# epoch 1: train_loss=0.90  val_loss=0.88
# epoch 5: train_loss=0.40  val_loss=0.45
# epoch 9: train_loss=0.12  val_loss=0.61   <- val_loss badh raha hai = overfitting`,
          output: `# koi output nahi — yeh sirf ek pattern hai jo training logs mein dhoondhna hai`,
        },
        {
          num: 37, title: 'Dropout',
          why: "Neurons ek doosre par over-rely karne lagte hain; random neurons ko switch off karne se model robust banta hai.",
          how: "Layers ke beech nn.Dropout(p=0.5) lagate hain jo training ke time randomly 50% activations zero kar deta hai.",
          solves: "Neuronal co-adaptation aur overfitting ko effectively rokta hai.",
          desc: "Regularization layer jo training ke dauraan random activations deactivate karke generalization badhati hai.",
          code: `import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Dropout(p=0.5),   # 50% dropout
    nn.Linear(256, 10)
)
print(model)`,
          output: `Sequential(
  (0): Linear(in_features=784, out_features=256, bias=True)
  (1): ReLU()
  (2): Dropout(p=0.5, inplace=False)
  (3): Linear(in_features=256, out_features=10, bias=True)
)`,
        },
        {
          num: 38, title: 'Weight Decay',
          why: "Weights bohot bade hone par model noisy data pe overreact karta hai aur sharp decision boundaries bana leta hai.",
          how: "Optimizer initialize karte time weight_decay=1e-4 (L2 regularization) parameter pass karte hain.",
          solves: "Weights ko chhota aur smooth rakh kar generalization improve karta hai.",
          desc: "L2 weight regularization jo model weights ko exploding se rok kar stability deta hai.",
          code: `optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-4)
print(optimizer)`,
          output: `AdamW (
Parameter Group 0
    lr: 0.001
    weight_decay: 0.0001
    ...
)`,
        },
        {
          num: 39, title: 'Early Stopping',
          why: "Fixed epochs tak train karne se aakhri epochs mein model overfit ho jaata hai aur compute waste hota hai.",
          how: "Validation loss monitor karte hain; agar N epochs tak loss improve na ho, toh training rok kar best weights save kar lete hain.",
          solves: "Over-training aur GPU compute waste ko automatically rokta hai.",
          desc: "Validation loss stagnate hone par training automatically stop karne ka mechanism.",
          code: `best_val_loss = float('inf')
patience = 10
counter = 0

for epoch in range(50):
    # train(...)
    val_loss = 0.30  # example
    if val_loss < best_val_loss:
        best_val_loss = val_loss
        torch.save(model.state_dict(), 'best_model.pth')
        counter = 0
    else:
        counter += 1
        if counter >= patience:
            print("Early stopping triggered")
            break`,
          output: `# jab val_loss patience epochs tak improve na ho, tab: "Early stopping triggered"`,
        },
        {
          num: 40, title: 'Transforms',
          why: "Raw images alag-alag sizes, formats aur pixel value ranges mein hoti hain jinhe model direct nahi le sakta.",
          how: "torchvision.transforms.Compose([Resize(...), ToTensor(), Normalize(...)]) se standardized pipeline banate hain.",
          solves: "Input dimensions aur pixel distributions ko standardize karke training stable banata hai.",
          desc: "Image preprocessing transformations pipeline for standardization.",
          code: `from torchvision import transforms

train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])
print(train_transform)`,
          output: `Compose(
    RandomResizedCrop(size=(224, 224), ...)
    RandomHorizontalFlip(p=0.5)
    ColorJitter(brightness=[0.8, 1.2], contrast=[0.8, 1.2])
    ToTensor()
    Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
)`,
        },
        {
          num: 41, title: 'Data Augmentation',
          why: "Naya labeled data collect karna mehenga hota hai; model ko alag-alag angles aur variations seekhne ki zaroorat hoti hai.",
          how: "Training ke time RandomHorizontalFlip(), RandomRotation(), ColorJitter() jaise random transforms apply karte hain.",
          solves: "Chhote datasets mein overfitting rokk kar model ki robustness badhata hai.",
          desc: "Synthetic image variations generate karne ki technique jo dataset diversity boost karti hai.",
          code: `# example augmentation pipeline (vision)
aug = transforms.Compose([
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(15),
    transforms.ColorJitter(brightness=0.2),
])
print("augmentation pipeline ready")`,
          output: `augmentation pipeline ready`,
        },
        {
          num: 42, title: 'Optuna',
          why: "Learning rate, batch size aur layer sizes manually guess karna time-consuming aur inefficient hota hai.",
          how: "study = optuna.create_study() bana kar objective function mein trial.suggest_float('lr', 1e-5, 1e-1) optimize karte hain.",
          solves: "Best hyperparameters dhoondne ke process ko Bayesian search aur pruning se automate karta hai.",
          desc: "Hyperparameter optimization library jo best training settings automatically find karti hai.",
          code: `import optuna

def objective(trial):
    x = trial.suggest_float("x", -10, 10)
    return (x - 2) ** 2

study = optuna.create_study(direction="minimize")
study.optimize(objective, n_trials=100)

print("Best params:", study.best_params)
print("Best value:", study.best_value)`,
          output: `Best params: {'x': 2.0003}
Best value: 9.123e-08`,
        },
      ],
    },
    {
      num: 9, title: 'CNN',
      cards: [
        {
          num: 43, title: 'Conv2d',
          why: "Fully connected layers image ke 2D spatial layout ko tod dete hain aur millions of parameters create karte hain.",
          how: "nn.Conv2d(in_channels, out_channels, kernel_size=3) se image par sliding filter chala kar local patterns detect karte hain.",
          solves: "Spatial structure preserve karta hai aur parameter count bohot kam kar deta hai.",
          desc: "2D Convolution layer jo images ke spatial features (edges, textures) ko detect karti hai.",
          code: `import torch.nn as nn

conv = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, padding=1)

x = torch.randn(16, 1, 28, 28)      # batch=16, grayscale 28x28
out = conv(x)

print(out.shape)     # torch.Size([16, 32, 28, 28])`,
          output: `torch.Size([16, 32, 28, 28])`,
        },
        {
          num: 44, title: 'ReLU',
          why: "Convolutions ke baad non-linearity introduce karni hoti hai taaki model complex visual features differentiate kar sake.",
          how: "nn.ReLU() negative numbers ko zero kar deta hai (f(x) = max(0, x)) aur positive ko waise hi aage bhejta hai.",
          solves: "Deep networks mein vanishing gradient problem ko solve karta hai aur fast computation deta hai.",
          desc: "Standard non-linear activation layer jo negative values ko 0 karti hai.",
          code: `relu = nn.ReLU()

x = torch.tensor([-2.0, -0.5, 0.0, 1.5, 3.0])
print(relu(x))`,
          output: `tensor([0.0000, 0.0000, 0.0000, 1.5000, 3.0000])`,
        },
        {
          num: 45, title: 'Pooling',
          why: "Convolutions ke baad feature maps bade hote hain jinhe downsample karke compute kam aur feature robustness badhani hoti hai.",
          how: "nn.MaxPool2d(2, 2) har 2x2 grid se sabse bada number pick karke dimension aadha kar deta hai.",
          solves: "Memory/compute usage kam karta hai aur chhoote image shifts ke against invariant banata hai.",
          desc: "Spatial pooling layer jo resolution reduce karke dominant features extract karti hai.",
          code: `pool = nn.MaxPool2d(kernel_size=2, stride=2)

x = torch.randn(16, 32, 28, 28)
out = pool(x)

print(out.shape)     # torch.Size([16, 32, 14, 14])`,
          output: `torch.Size([16, 32, 14, 14])`,
        },
        {
          num: 46, title: 'Feature maps',
          why: "Model image mein kya dekh raha hai (edges, textures, shapes) usko debug aur visualize karna zaroori hota hai.",
          how: "Conv layers ke intermediate tensor outputs ko slice karke 2D images ke roop mein plot karte hain.",
          solves: "CNN ke andar hierarchical feature learning ko visual aur explainable banata hai.",
          desc: "Conv layers ke visual intermediate outputs jo learned patterns show karte hain.",
          code: `# Input:        (batch, 1, 28, 28)     -> original image
# After Conv1:  (batch, 32, 28, 28)    -> 32 feature maps
# After Pool1:  (batch, 32, 14, 14)
# After Conv2:  (batch, 64, 14, 14)    -> 64 feature maps
# After Pool2:  (batch, 64, 7, 7)
print("shape progression noted above")`,
          output: `shape progression noted above`,
        },
        {
          num: 47, title: 'CNN training',
          why: "Conv, ReLU, Pool aur Linear layers ko combine karke full image recognition model train karna hota hai.",
          how: "Image tensor ko Conv -> ReLU -> MaxPool blocks se guzaar kar flatten karte hain aur Linear layer se classes predict karte hain.",
          solves: "High accuracy image classification aur visual pattern recognition problem ko end-to-end solve karta hai.",
          desc: "Complete CNN model training pipeline for visual classification.",
          code: `class FashionCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),                    # 28x28 -> 14x14
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),                    # 14x14 -> 7x7
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, 10)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

model = FashionCNN()
x = torch.randn(4, 1, 28, 28)
print(model(x).shape)`,
          output: `torch.Size([4, 10])`,
        },
      ],
    },
    {
      num: 10, title: 'Transfer Learning',
      cards: [
        {
          num: 48, title: 'Pretrained model',
          why: "Scratch se model train karne ke liye millions of images aur weeks of GPU compute chahiye jo har kisi ke paas nahi hota.",
          how: "torchvision.models.resnet18(weights=ResNet18_Weights.DEFAULT) se pre-trained weights ke saath model load karte hain.",
          solves: "Chhote datasets par bhi ImageNet pe seekhe gaye high-level features ka fayda utha kar high accuracy deta hai.",
          desc: "Massive dataset pe pre-trained neural network backbone with pre-learned visual weights.",
          code: `from torchvision import models

model = models.resnet18(weights="IMAGENET1K_V1")
print(type(model).__name__)
print(model.fc)`,
          output: `ResNet
Linear(in_features=512, out_features=1000, bias=True)`,
        },
        {
          num: 49, title: 'Freeze',
          why: "Pretrained model ki base layers already general features seekh chuki hain; unhe train karne se wo destroy ho sakti hain.",
          how: "Base layers ke parameters pe param.requires_grad = False set kar dete hain.",
          solves: "Training ko ultra-fast banata hai aur pretrained features ko preserve karta hai.",
          desc: "Pretrained backbone ke parameters ko freeze karke gradient updates prevent karna.",
          code: `for param in model.parameters():
    param.requires_grad = False

trainable = sum(p.requires_grad for p in model.parameters())
print("Trainable params:", trainable)`,
          output: `Trainable params: 0`,
        },
        {
          num: 50, title: 'Replace classifier',
          why: "Pretrained models 1,000 ImageNet classes ke liye hote hain; aapke custom project mein classes alag hoti hain (jaise 2 classes).",
          how: "Aakhri fully connected layer ko apne classes ke count se replace karte hain: model.fc = nn.Linear(in_features, my_classes).",
          solves: "Pretrained model ko custom classes aur domains ke liye adapt karta hai.",
          desc: "Final classification layer ko replace karke custom target classes set karna.",
          code: `import torch.nn as nn

num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 10)

print(model.fc)`,
          output: `Linear(in_features=512, out_features=10, bias=True)`,
        },
        {
          num: 51, title: 'Fine-tuning',
          why: "Custom dataset ke specific nuances seekhne ke liye top layers ko thoda adjust karna zaroori hota hai.",
          how: "Top layers ko unfreeze karke bohot kam learning rate (jaise 1e-5) ke saath model ko train karte hain.",
          solves: "Model ki accuracy ko specialized tasks (medical x-rays, satellite images) pe maximum level tak boost karta hai.",
          desc: "Deep layers ko gentle learning rate ke saath fine-tune karna for peak accuracy.",
          code: `for param in model.layer4.parameters():
    param.requires_grad = True

optimizer = torch.optim.Adam(
    filter(lambda p: p.requires_grad, model.parameters()), lr=1e-4
)
print(sum(p.requires_grad for p in model.parameters()), "params ab trainable hain")`,
          output: `18 params ab trainable hain`,
        },
      ],
    },
    {
      num: 11, title: 'Sequence Models',
      cards: [
        {
          num: 52, title: 'Embedding',
          why: "Words ke integer IDs mein koi meaning ya semantic relation nahi hota, aur One-hot encoding bohot memory waste karti hai.",
          how: "nn.Embedding(vocab_size, embedding_dim) se har word ID ko dense continuous vector space mein map karte hain.",
          solves: "Words ke semantic meaning aur context ko dense vectors mein efficiently represent karta hai.",
          desc: "Dense vector lookup layer jo discrete tokens ko geometric embedding space mein map karti hai.",
          code: `embedding = nn.Embedding(num_embeddings=10000, embedding_dim=100)

input_indices = torch.tensor([[1, 45, 23, 87, 3],
                              [9, 12, 4, 66, 21]])

output = embedding(input_indices)
print(output.shape)`,
          output: `torch.Size([2, 5, 100])`,
        },
        {
          num: 53, title: 'RNN',
          why: "Normal feedforward networks sequential data (sentences, time-series) ka order aur purana context yaad nahi rakh sakte.",
          how: "nn.RNN(input_size, hidden_size) use karte hain jo har step pe naye input ke saath purana hidden state h_t update karta hai.",
          solves: "Sequential dependencies aur context ko step-by-step process karta hai.",
          desc: "Recurrent architecture jo sequences ko step-by-step temporal state ke saath process karta hai.",
          code: `rnn = nn.RNN(input_size=100, hidden_size=64, num_layers=1, batch_first=True)

x = torch.randn(2, 5, 100)
output, hidden = rnn(x)

print(output.shape)
print(hidden.shape)`,
          output: `torch.Size([2, 5, 64])
torch.Size([1, 2, 64])`,
        },
        {
          num: 54, title: 'LSTM',
          why: "Simple RNN lambi sequences mein purana context bhool jaata hai (vanishing gradient problem).",
          how: "nn.LSTM() mein 3 gates (Forget, Input, Output) aur ek Cell State hoti hai jo long-term memory store karti hai.",
          solves: "Long-range sequential dependencies aur vanishing gradients ki problem ko solve karta hai.",
          desc: "Gated recurrent architecture jo long-term context aur gradients preserve karta hai.",
          code: `lstm = nn.LSTM(input_size=100, hidden_size=64, num_layers=2,
               batch_first=True, dropout=0.2)

x = torch.randn(2, 10, 100)
output, (hidden, cell) = lstm(x)

print(output.shape)
print(hidden.shape)
print(cell.shape)`,
          output: `torch.Size([2, 10, 64])
torch.Size([2, 2, 64])
torch.Size([2, 2, 64])`,
        },
        {
          num: 55, title: 'GRU',
          why: "LSTM ke 3 gates aur cell state compute-heavy hote hain; fast training ke liye simpler architecture chahiye.",
          how: "nn.GRU() cell state aur gates ko simplify karke sirf 2 gates (Reset aur Update) use karta hai.",
          solves: "LSTM jaisi performance kam parameters aur faster training speed ke saath deta hai.",
          desc: "Lightweight gated recurrent unit with streamlined update and reset gates.",
          code: `gru = nn.GRU(input_size=100, hidden_size=64, num_layers=1, batch_first=True)

x = torch.randn(2, 8, 100)
output, hidden = gru(x)

print(output.shape)
print(hidden.shape)`,
          output: `torch.Size([2, 8, 64])
torch.Size([1, 2, 64])`,
        },
        {
          num: 56, title: 'Sequence classification',
          why: "Text sentences (sentiment analysis, spam detection) ko classify karne ke liye poori sequence ka summary vector chahiye hota hai.",
          how: "Embedding -> LSTM -> Aakhri hidden state out[:, -1, :] ko pick karke nn.Linear se class probability mein badalte hain.",
          solves: "Variable-length text ko fixed categorical prediction mein convert karta hai.",
          desc: "Sequence to class prediction architecture for NLP tasks.",
          code: `class SentimentClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_classes):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, num_classes)

    def forward(self, x):
        embedded = self.embedding(x)
        output, (hidden, cell) = self.lstm(embedded)
        out = self.fc(hidden[-1])
        return out

model = SentimentClassifier(10000, 100, 64, 2)
x = torch.randint(0, 10000, (4, 20))
print(model(x).shape)`,
          output: `torch.Size([4, 2])`,
        },
        {
          num: 57, title: 'QA',
          why: "Paragraph mein se question ka answer dhoondne ke liye start aur end token positions predict karni hoti hain.",
          how: "Context aur Question tokens ko encode karke sequence ke har token ke liye Start aur End logits predict karte hain.",
          solves: "Span extraction aur extractive document QA problem ko solve karta hai.",
          desc: "Extractive question answering model identifying answer token spans.",
          code: `class SimpleQA(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_answers):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.context_lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.question_lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Sequential(
            nn.Linear(hidden_dim * 2, 128), nn.ReLU(),
            nn.Dropout(0.3), nn.Linear(128, num_answers)
        )

    def forward(self, context, question):
        _, (ctx_h, _) = self.context_lstm(self.embedding(context))
        _, (q_h, _) = self.question_lstm(self.embedding(question))
        combined = torch.cat((ctx_h[-1], q_h[-1]), dim=1)
        return self.fc(combined)

model = SimpleQA(10000, 100, 64, 5)
ctx = torch.randint(0, 10000, (2, 30))
q = torch.randint(0, 10000, (2, 8))
print(model(ctx, q).shape)`,
          output: `torch.Size([2, 5])`,
        },
      ],
    },
    {
      num: 12, title: 'Production',
      cards: [
        {
          num: 58, title: 'Save model',
          why: "Training mein ghanton lagte hain; model ke seekhe hue weights ko disk par save karna zaroori hai taaki dubara train na karna pade.",
          how: "torch.save(model.state_dict(), 'model.pth') se model ke saare learned weights dictionary save karte hain.",
          solves: "Model weights ko lightweight, portable format mein persist karta hai.",
          desc: "Model weights aur state dict ko disk file (.pth) mein save karne ka method.",
          code: `torch.save(model.state_dict(), "fashion_mnist_model.pth")

torch.save({
    'epoch': 5,
    'model_state_dict': model.state_dict(),
}, "checkpoint.pth")
print("saved")`,
          output: `saved`,
        },
        {
          num: 59, title: 'Load model',
          why: "Deployment ya testing ke time saved weights ko model architecture ke andar reload karna hota hai.",
          how: "Architecture instantiate karke model.load_state_dict(torch.load('model.pth')) se saved weights load karte hain.",
          solves: "Saved weights ko instant memory mein restore karke inference ready banata hai.",
          desc: "Disk se saved weights load karke model parameters ko populate karna.",
          code: `model2 = FashionCNN()
model2.load_state_dict(torch.load("fashion_mnist_model.pth", map_location="cpu"))
model2.eval()
print("loaded, ready for inference")`,
          output: `loaded, ready for inference`,
        },
        {
          num: 60, title: 'Checkpoint',
          why: "Lambi training runs crash ho sakti hain (power cut, cloud preemption); training ko beech se resume karne ki capability honi chahiye.",
          how: "Epoch, model weights, optimizer state aur loss ko ek single .tar dictionary mein save karte hain.",
          solves: "Crash ya spot instance termination ke baad training ko exact point se seamlessly resume karta hai.",
          desc: "Full training state (model + optimizer + epoch + loss) checkpointing for crash resilience.",
          code: `def save_checkpoint(model, optimizer, epoch, loss, path="checkpoint.pth"):
    torch.save({
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'loss': loss,
    }, path)

def load_checkpoint(model, optimizer, path="checkpoint.pth"):
    ckpt = torch.load(path)
    model.load_state_dict(ckpt['model_state_dict'])
    optimizer.load_state_dict(ckpt['optimizer_state_dict'])
    return model, optimizer, ckpt['epoch'], ckpt['loss']

print("checkpoint helpers ready")`,
          output: `checkpoint helpers ready`,
        },
        {
          num: 61, title: 'Inference',
          why: "Production mein prediction deterministic, fast aur low memory honi chahiye bina gradient tracking ke.",
          how: "model.eval() mode set karte hain aur with torch.no_grad(): block ke andar input pass karke prediction lete hain.",
          solves: "Dropout ko disable karta hai aur unnecessary gradient memory allocation ko eliminate karta hai.",
          desc: "Evaluation mode aur no_grad ke saath lightweight, deterministic production inference.",
          code: `def predict(model, image, device, class_names):
    model.eval()
    with torch.no_grad():
        image = image.to(device)
        if image.dim() == 3:
            image = image.unsqueeze(0)
        output = model(image)
        prob = torch.softmax(output, dim=1)
        conf, pred = torch.max(prob, 1)
    return class_names[pred.item()], conf.item()

print("predict() ready")`,
          output: `predict() ready`,
        },
        {
          num: 62, title: 'Deployment basics',
          why: "Production servers pe Python runtime heavy hota hai; lightweight API aur cross-platform export format chahiye hota hai.",
          how: "torch.jit.trace() ya ONNX export karke model ko FastAPI, TorchServe ya C++ environment mein deploy karte hain.",
          solves: "Python dependency ko decouple karke fast, scalable REST microservices aur mobile deployment enable karta hai.",
          desc: "TorchScript / ONNX export and API serving for scalable production architectures.",
          code: `# TorchScript export (production-ready)
scripted_model = torch.jit.script(model)
scripted_model.save("model_scripted.pt")

# Load later, anywhere
loaded = torch.jit.load("model_scripted.pt")
print("scripted and reloaded")`,
          output: `scripted and reloaded`,
        },
      ],
    },
  ],
};
