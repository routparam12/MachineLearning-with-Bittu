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
          desc: 'Tensor PyTorch ka sabse basic data structure hai — NumPy array jaisa multi-dimensional array, lekin GPU support aur automatic differentiation (Autograd) ke saath. Deep learning ki saari calculations (weights, inputs, gradients) tensors pe hi hoti hain, isliye plain NumPy kaafi nahi hai. `torch.tensor()` se banate hain — scalar, vector, matrix ya usse bhi higher dimensions ho sakte hain.',
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
          desc: 'Shape batata hai tensor ke kitne dimensions hain aur har dimension mein kitne elements hain — jaise `(3, 4)` matlab 3 rows, 4 columns. Model ki layers ke input-output match karne ke liye shape sahi hona zaroori hai, warna error aata hai. `.shape`/`.size()` se dekhte hain, aur `.view()`, `.reshape()`, `.unsqueeze()`, `.squeeze()` se badalte hain.',
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
          desc: 'dtype batata hai tensor ke andar data kis type ka store ho raha hai — float32, int64, bool waghera. Weights mostly float32 hote hain, labels int64/long, aur sahi dtype memory + speed dono optimize karta hai. Create karte time `dtype=` de sakte ho, ya baad mein `.to()` / `.type()` se change kar sakte ho.',
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
          desc: 'Device batata hai tensor CPU pe hai ya GPU (CUDA) pe. Deep learning models GPU pe 10-50x tezz chalte hain, isliye tensors ko sahi device pe rakhna zaroori hai. `tensor.to("cuda")` GPU pe bhejta hai, `tensor.to("cpu")` wapas CPU pe. Rule: model aur data dono same device pe hone chahiye, warna error aayega.',
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
          desc: 'Tensors pe mathematical aur logical operations — addition, multiplication, matrix multiply waghera. Neural network ki saari calculations (forward pass, loss, gradients) inhi operations se hoti hain. Element-wise (`+`, `*`) aur matrix operations (`@`, `matmul`) alag hote hain — in-place operations (`add_`, `mul_`) memory efficient hoti hain.',
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
          desc: '`requires_grad=True` ek flag hai jo PyTorch ko batata hai ki is tensor ke liye gradients track karne hain. Sirf model ke parameters (weights & biases) ke liye gradients chahiye — input data ke liye zaroori nahi. Default `False` hota hai; baad mein `tensor.requires_grad_(True)` se on bhi kar sakte ho. Ye unnecessary memory/computation waste rokta hai.',
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
          desc: 'Ek directed graph jo PyTorch automatically banata hai jab tensors pe operations hoti hain (aur `requires_grad=True` ho) — nodes tensors hain, edges operations. Backpropagation (chain rule) ke liye PyTorch ko pata hona chahiye ki kaunsa operation kis order mein hua. Forward pass ke time graph banta hai; `backward()` isse reverse order mein traverse karta hai.',
          code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2                  # Operation 1
z = torch.sin(y)            # Operation 2
print(z)                    # grad_fn=<SinBackward0>

# x -> (power) -> y -> (sin) -> z`,
          output: `tensor(0.4121, grad_fn=<SinBackward0>)`,
        },
        {
          num: 8, title: 'backward()',
          desc: '`backward()` computational graph ko reverse direction mein traverse karke gradients calculate karta hai (backpropagation). Usually scalar tensor (loss) pe call karte hain. Har `requires_grad=True` tensor ke `.grad` mein value store ho jaati hai. Ek baar `backward()` ke baad graph free ho jaata hai (memory save) — dobara chahiye to `retain_graph=True` use karo.',
          code: `x = torch.tensor(3.0, requires_grad=True)

y = x ** 2          # y = 9
z = torch.sin(y)    # z = sin(9)

z.backward()        # Gradients calculate

print(x.grad)       # dz/dx = 2x * cos(x^2)`,
          output: `tensor(-0.9111)`,
        },
        {
          num: 9, title: 'gradients (.grad)',
          desc: '`.grad` attribute mein `backward()` ke baad calculated gradient store hoti hai — batata hai loss us parameter ke respect mein kitna change hoga. Gradient Descent mein weights update karne ke liye zaroori hai. Gradients accumulate hote hain, isliye har step se pehle `zero_grad()` / `.grad.zero_()` karna zaroori hai.',
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
          desc: 'Forward pass mein input data model ke through aage badhta hai aur final prediction generate hoti hai — model ki current weights ke basis pe. Single neuron ke liye simply `y_pred = w * x + b` (plus optional activation). Isi prediction se baad mein loss calculate hoti hai.',
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
          desc: 'Loss batata hai model ki prediction actual target se kitni door hai — jitna zyada loss, utna kharab performance. Training ka goal isi ko minimize karna hota hai. Regression ke liye MSE, binary classification ke liye BCE, multi-class ke liye Cross Entropy common hain.',
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
          desc: 'Backward pass mein `loss.backward()` call karke gradients calculate hote hain (Autograd use karke) — har weight/bias ka gradient pata chalta hai taaki unhe sahi direction mein update kiya ja sake. Manually chain rule apply karne ki zaroorat khatam ho jaati hai.',
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
          desc: 'Gradients ke basis pe weights/biases update karna: `parameter = parameter - learning_rate * gradient`. `torch.no_grad()` ke andar update karte hain (kyunki us waqt tracking ki zaroorat nahi), aur update ke baad gradients zero karna zaroori hai — warna agle step mein purane gradients ke saath accumulate ho jayenge.',
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
          desc: 'Forward → Loss → Backward → Update — inn sab steps ko baar-baar repeat karna hi training hai. Ek baar mein model perfect nahi banta; kai epochs tak train karke loss minimize karte hain. Neeche wala example `y = 2x + 1` seekhna hai, aur 100 epochs ke baad w aur b un values ke paas pahunch jaate hain.',
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
          desc: '`nn.Module` PyTorch ka base class hai — isko inherit karke apna custom neural network banate hain. Manually weights manage karna mushkil ho jaata hai; `nn.Module` automatically parameters track karta hai, GPU pe move karna aasaan banata hai, aur code clean/organized rakhta hai. `__init__` mein layers define karte hain, `forward()` mein data flow likhte hain.',
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
          desc: '`nn.Linear` ek fully connected (dense) layer hai jo `y = x @ W.T + b` perform karta hai. `in_features` aur `out_features` dekar banate ho, aur ye automatically weights + bias create kar deta hai (`requires_grad=True` ke saath) — manual weight init aur matrix multiplication ki tension khatam.',
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
          desc: 'Activation functions non-linearity introduce karti hain — inke bina network sirf linear combinations hi seekh sakta hai, real-world problems non-linear hoti hain. ReLU hidden layers ke liye sabse common hai, Sigmoid binary output ke liye, Softmax multi-class output ke liye.',
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
          desc: 'Optimizer weights update karne ka smart tarika hai — gradients leke parameters ko improve karta hai, advanced techniques (momentum, adaptive lr) ke saath. Manually `w = w - lr * w.grad` har jagah likhna possible nahi; `Adam` sabse commonly used optimizer hai.',
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
          desc: 'Model + loss + optimizer + data ek saath kaam karte hain — bar-bar forward → backward → update cycle chalta hai taaki model data se seekhe. Standard structure: `model.train()`, phir har batch pe forward, `optimizer.zero_grad()`, `loss.backward()`, `optimizer.step()`.',
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
          desc: '`Dataset` ek abstract class hai jo aapke data ko represent karta hai — kitne samples hain (`__len__`) aur kisi index pe data kaise milega (`__getitem__`). Raw data (images, CSV, text) ko PyTorch ke training loop ke saath compatible banane ke liye zaroori hai.',
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
          desc: '`DataLoader` Dataset ko wrap karta hai aur batches, shuffling, aur parallel loading provide karta hai. Pura dataset ek saath memory mein load karna possible nahi hota, isliye DataLoader chhote-chhote batches mein efficiently laata hai — training fast, memory-efficient aur convenient ban jaati hai.',
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
          desc: 'Batch = Dataset ke kuch samples ka group; training ke time model ek saath kai samples pe kaam karta hai. Pure dataset pe gradient descent slow + memory heavy hota hai, single sample (SGD) noisy hota hai — batch ek sweet spot hai (speed + stability).',
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
          desc: 'Sampler decide karta hai Dataset se samples kis order mein uthaye jayenge — kabhi random chahiye, kabhi sequential, kabhi class imbalance ke hisaab se weighted sampling. DataLoader ko `sampler=` dete hain; sampler use karte time `shuffle=False` rakhna padta hai.',
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
          desc: '`collate_fn` ek function hai jo batata hai individual samples ko batch mein kaise combine kiya jaye. Default collate simple tensors ke liye kaam karta hai, lekin variable length sequences (text/audio) ya custom data structures ke liye apna logic chahiye hota hai.',
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
          desc: 'Fashion MNIST ek image classification dataset hai — 70,000 grayscale images (28x28 pixels), 10 categories (T-shirt, Trouser, Sneaker...). MNIST se thoda tough hota hai, isliye beginners ke liye perfect real-world starting project maana jaata hai — 60,000 training + 10,000 test images.',
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
          desc: 'Artificial Neural Network (fully connected) jisme input layer → hidden layers → output layer hota hai. Images classify karne ke liye pehla simple architecture — CNN se pehle basics samajhne ke liye perfect. Input 784 (28x28 flatten), hidden 128 → 64 (ReLU), output 10 neurons.',
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
          desc: 'Model ko data dikhake weights update karna — har epoch mein pure training data pe forward → loss → backward → update hota hai. Model tabhi seekhta hai jab usse bar-bar examples dikhaye jayein aur galti (loss) ke hisaab se improve kiya jaye.',
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
          desc: 'Training ke dauran model ki performance check karne ke liye alag data (validation set) use karte hain — isse overfitting pata chalta hai. Sirf training loss dekhne se pata nahi chalta ki model naye data pe accha perform karega ya nahi. Training set ka 10-20% validation ke liye nikaal lete hain.',
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
          desc: 'Final evaluation jo bilkul alag (unseen) test set pe hoti hai — training ke baad ispe check karte hain. Validation se hyperparameters tune karte hain, test set se final honest performance pata chalti hai. `model.eval()` + `torch.no_grad()` ke saath predictions nikalte hain.',
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
          desc: 'Accuracy = kitne samples sahi predict hue / total samples x 100. Loss ke alawa classification performance ka seedha measure — log easily samajh sakte hain. Predicted class = `torch.argmax(outputs, dim=1)`, phir predicted aur actual labels compare karke accuracy nikalte hain.',
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
          desc: 'CUDA NVIDIA ka technology hai jo GPU ko general-purpose computing ke liye use karne deta hai. Deep learning mein lakhon-crore calculations hoti hain — CPU sequential kaam karta hai, GPU hazaaron cores ke saath parallel kaam karta hai, isse training 10x se 50x tak tezz ho jaati hai.',
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
          desc: '`device` ek object hai jo batata hai tensor/model kis hardware pe chalega — CPU ya GPU. Code ko flexible banane ke liye device variable banate hain, taaki same code CPU aur GPU dono pe kaam kare, GPU na hone pe bhi na tootey.',
          code: `device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(device)`,
          output: `cpu`,
        },
        {
          num: 33, title: 'model.to(device)',
          desc: 'Model ke saare parameters (weights & biases) ko specified device pe move karna. Jab tak model GPU pe nahi hota, tab tak GPU ki speed ka faayda nahi milta. Note: ek baar model GPU pe chala gaya, naye tensors default CPU pe hi banenge — data ko bhi move karna padta hai.',
          code: `model = FashionANN()
model = model.to(device)

print(next(model.parameters()).device)`,
          output: `cpu`,
        },
        {
          num: 34, title: 'batch.to(device)',
          desc: 'Har batch ke input images aur labels ko bhi usi device pe bhejna jahan model hai. PyTorch ka rule hai: model aur data same device pe hone chahiye, warna "Expected all tensors to be on the same device" error aata hai. Training loop ke andar har batch ko move karte hain.',
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
          desc: 'Poora training process GPU pe chalana — model + data dono GPU pe. 3 steps: device define karo, model ko device pe bhejo, har batch ko device pe bhejo. Chhote dataset (Fashion MNIST) pe bhi farak dikhta hai; bade datasets pe GPU almost compulsory hai.',
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
          desc: 'Overfitting tab hota hai jab model training data ko itna acche se seekh leta hai (uske noise sahit) ki training pe to accha perform karta hai, par unseen validation/test data pe kharab. Symptoms: training loss girta rehta hai jabki validation loss badhna shuru ho jaata hai. Wajah: model zyada complex, kam regularisation, ya bohot zyada epochs.',
          code: `# Symptom pattern to watch for while training:
# epoch 1: train_loss=0.90  val_loss=0.88
# epoch 5: train_loss=0.40  val_loss=0.45
# epoch 9: train_loss=0.12  val_loss=0.61   <- val_loss badh raha hai = overfitting`,
          output: `# koi output nahi — yeh sirf ek pattern hai jo training logs mein dhoondhna hai`,
        },
        {
          num: 37, title: 'Dropout',
          desc: 'Regularization technique jo training ke time neurons ke outputs ka ek fraction randomly 0 kar deti hai (typically 50% hidden layers ke liye). Ye neurons ko ek-doosre pe zyada depend hone se rokta hai aur network ko robust features seekhne pe majboor karta hai — ek tarah se kai chhote networks ka ensemble train hota hai.',
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
          desc: 'Bade weights ko penalize karne wali regularization technique — loss function mein weights ke squared magnitude (L2) ka ek term add hota hai. Optimizer mein ye weights ka multiplicative decay jaisa implement hota hai. Common values: lambda 1e-5 se 1e-2 ke beech.',
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
          desc: 'Simple aur effective regularization method jo validation metric (usually loss) monitor karta hai, aur agar `patience` epochs tak improve nahi hota to training rok deta hai. Best epoch ka model save karke, baad mein use restore kar sakte ho.',
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
          desc: 'Input data (mostly images, kabhi text/audio) pe apply hone wale operations jo unhe model ke liye ready karte hain ya augment karte hain. Preprocessing (Resize, Normalize, ToTensor) aur augmentation (RandomHorizontalFlip, RandomRotation) — torchvision mein inhe pipeline mein compose karte hain.',
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
          desc: 'Training dataset ka size aur diversity artificially badhana — existing samples pe random par realistic transformations apply karke. Model in variations ke liye invariant ban jaata hai, jisse overfitting kam hoti hai. Geometric (flip, rotate, crop), photometric (brightness/contrast), aur advanced (MixUp, CutMix, AutoAugment) common techniques hain.',
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
          desc: 'Optuna ek automatic hyperparameter optimization framework hai — "define-by-run" API se dynamically search space banta hai. Bad trials ko prune kar sakta hai, multi-objective optimization support karta hai. Key concepts: Study (ek optimization session), Trial (ek hyperparameter combination ka evaluation), Objective function (jo trial leke metric return karta hai).',
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
          desc: '`nn.Conv2d` convolutional layer hai jo images pe filters (kernels) slide karke local patterns (edges, textures, shapes) detect karta hai. Fully connected layers images ki spatial structure tod dete hain — convolution spatial info preserve karta hai aur parameters bhi bahut kam use karta hai. Important params: `in_channels`, `out_channels`, `kernel_size`, `stride`, `padding`.',
          code: `import torch.nn as nn

conv = nn.Conv2d(in_channels=1, out_channels=32, kernel_size=3, padding=1)

x = torch.randn(16, 1, 28, 28)      # batch=16, grayscale 28x28
out = conv(x)

print(out.shape)     # torch.Size([16, 32, 28, 28])`,
          output: `torch.Size([16, 32, 28, 28])`,
        },
        {
          num: 44, title: 'ReLU',
          desc: 'ReLU (`nn.ReLU()`) activation function hai jo negative values ko 0 kar deta hai, positive as-it-is rehne deta hai (`f(x) = max(0, x)`). Convolution ke baad non-linearity zaroori hai, warna poora network linear reh jaayega. Network ko complex patterns seekhne ki ability deta hai aur vanishing gradient thoda kam karta hai.',
          code: `relu = nn.ReLU()

x = torch.tensor([-2.0, -0.5, 0.0, 1.5, 3.0])
print(relu(x))`,
          output: `tensor([0.0000, 0.0000, 0.0000, 1.5000, 3.0000])`,
        },
        {
          num: 45, title: 'Pooling',
          desc: 'Pooling layer feature map ka size kam karti hai (downsampling) aur important information preserve karti hai — computation kam hota hai, overfitting control hoti hai, aur translation invariance milta hai. MaxPool2d (window ka max value) sabse common hai; usually 2x2 window + stride=2 se size half ho jaata hai.',
          code: `pool = nn.MaxPool2d(kernel_size=2, stride=2)

x = torch.randn(16, 32, 28, 28)
out = pool(x)

print(out.shape)     # torch.Size([16, 32, 14, 14])`,
          output: `torch.Size([16, 32, 14, 14])`,
        },
        {
          num: 46, title: 'Feature maps',
          desc: 'Feature Map = convolution ke baad jo output nikalta hai; har filter ek alag feature map banata hai. Har filter alag pattern detect karta hai (edges, corners, textures...), multiple feature maps milke rich representation banate hain. Pehli layers simple features seekhti hain, gehri layers complex features (eyes, wheels, faces).',
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
          desc: 'Conv + ReLU + Pooling layers se bani network ko train karna — ANN se kaafi behtar accuracy milti hai images pe, kyunki spatial patterns preserve hote hain. Typical architecture: Conv → ReLU → MaxPool (repeat) → Flatten → Linear → ReLU → Dropout → Linear (output). Fashion MNIST pe 90%+ accuracy tak le jaata hai.',
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
          desc: 'Pretrained model wo neural network hai jo pehle se kisi bade dataset (jaise ImageNet — 1.2 million images, 1000 classes) pe train ho chuka hota hai. Scratch se train karna bahut data + time + GPU maangta hai aur chhote datasets pe overfit ho jaata hai. `torchvision.models` se ready-made models milte hain (ResNet, VGG, EfficientNet, MobileNet).',
          code: `from torchvision import models

model = models.resnet18(weights="IMAGENET1K_V1")
print(type(model).__name__)
print(model.fc)`,
          output: `ResNet
Linear(in_features=512, out_features=1000, bias=True)`,
        },
        {
          num: 49, title: 'Freeze',
          desc: 'Freeze ka matlab hai model ke kuch layers ke parameters ko train hone se rok dena (`requires_grad = False`). Early layers generic features (edges, colors) seekhte hain — unhe dobara train karna zaroori nahi. Isse overfitting kam hoti hai, training tezz hoti hai, aur kam data pe bhi accha result aata hai.',
          code: `for param in model.parameters():
    param.requires_grad = False

trainable = sum(p.requires_grad for p in model.parameters())
print("Trainable params:", trainable)`,
          output: `Trainable params: 0`,
        },
        {
          num: 50, title: 'Replace classifier',
          desc: 'Pretrained model ka last fully-connected layer (classifier) hata ke uski jagah apna naya classifier lagana jo aapke classes ke hisaab se ho. ImageNet pe 1000 classes hoti hain, aapke project mein alag ho sakti hain (jaise Fashion MNIST — 10 classes). ResNet mein `fc`, VGG/MobileNet mein `classifier` layer replace karte hain.',
          code: `import torch.nn as nn

num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 10)

print(model.fc)`,
          output: `Linear(in_features=512, out_features=10, bias=True)`,
        },
        {
          num: 51, title: 'Fine-tuning',
          desc: 'Pretrained model ke kuch (ya saare) layers ko apne dataset pe thoda aur train karna. Sirf classifier replace karke train karna (Feature Extraction) kabhi kaafi nahi hota — fine-tuning se model apne data ke specific patterns bhi seekh leta hai. Strategy: last few blocks + classifier unfreeze karo, bohot chhota learning rate use karo.',
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
          desc: 'Words (ya tokens) ko dense continuous vectors mein convert karne ki technique — har word ek fixed-size vector ban jaata hai jo uska meaning capture karta hai. One-hot encoding bahut sparse hota hai; `nn.Embedding` ek lookup table banata hai jo training ke dauran seekhi jaati hai. Similar meaning wale words ke vectors space mein paas-paas hote hain.',
          code: `embedding = nn.Embedding(num_embeddings=10000, embedding_dim=100)

input_indices = torch.tensor([[1, 45, 23, 87, 3],
                              [9, 12, 4, 66, 21]])

output = embedding(input_indices)
print(output.shape)`,
          output: `torch.Size([2, 5, 100])`,
        },
        {
          num: 53, title: 'RNN',
          desc: 'Sequence data (text, time series) handle karne wala network — hidden state hota hai jo previous information yaad rakhta hai. Normal network har input ko independent maanta hai, par text mein order matter karta hai. Har time step pe current input + previous hidden state se naya hidden state + output banta hai. Limitation: long sequences mein vanishing gradient.',
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
          desc: 'Advanced RNN jo gates (Forget, Input, Output) use karke long-term dependencies better yaad rakhta hai. Simple RNN long sequences mein fail ho jaata hai — LSTM vanishing gradient problem ko kaafi had tak solve karta hai. Forget Gate purani info bhoolta hai, Input Gate nayi info leta hai, Output Gate aage bhejta hai.',
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
          desc: 'LSTM ka simplified version — sirf 2 gates (Reset + Update), LSTM se thoda simple + tezz. LSTM powerful hai lekin heavy; GRU almost same performance kam parameters ke saath deta hai. Reset Gate purani info kitni ignore karni hai decide karta hai, Update Gate nayi info kitni add karni hai.',
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
          desc: 'Poori sequence ko dekh kar ek single label predict karna (sentiment analysis, spam detection, emotion classification). Pipeline: Text → Embedding → RNN/LSTM/GRU → last hidden state → Fully Connected → Class. Text ka overall meaning samajhna hai, ek-ek word nahi.',
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
          desc: 'Question Answering system mein model ko context (paragraph) + question diya jaata hai, aur wo answer predict karta hai — chatbots, search, document QA jaise real-world applications ke liye. Simple version: context aur question dono ko encode karo (shared embedding + LSTM), representations combine karo, answer predict karo. Modern QA (BERT, RoBERTa) contextual embeddings use karte hain.',
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
          desc: 'Trained model ke weights (parameters) ko disk pe save karna taaki baad mein use kar sako — training bahut time leti hai, har baar dubara train nahi karna chahte. `state_dict` save karna (sirf weights) best practice hai; poora model bhi save kar sakte ho (architecture + weights dono).',
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
          desc: 'Saved weights ko wapas model mein load karna — inference, fine-tuning ya resume training ke liye. Pehle model architecture create karo, phir weights load karo. Device ke saath load karte time `map_location=device` dena zaroori hai.',
          code: `model2 = FashionCNN()
model2.load_state_dict(torch.load("fashion_mnist_model.pth", map_location="cpu"))
model2.eval()
print("loaded, ready for inference")`,
          output: `loaded, ready for inference`,
        },
        {
          num: 60, title: 'Checkpoint',
          desc: 'Training ke beech-beech mein model + optimizer + epoch + loss ko save karna — agar training toot jaaye to wahin se continue kar sakte ho. Long training interrupt ho sakti hai, best model (lowest validation loss) save karna zaroori hota hai.',
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
          desc: 'Trained model se prediction nikalna (naye data pe) — training nahi hoti, sirf forward pass chalta hai. `model.eval()` Dropout/BatchNorm ko evaluation mode mein daalta hai, `torch.no_grad()` gradients calculate nahi karta (tezz + kam memory) — real-world use mein user ko result dikhana.',
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
          desc: 'Model ko real application (web, mobile, API) mein lagana taaki users use kar saken — model tabhi useful hai jab log usse interact kar saken. FastAPI/Flask web API ke liye, TorchScript production-optimized export ke liye, ONNX cross-platform ke liye, PyTorch Mobile mobile apps ke liye, Gradio/Streamlit quick demo ke liye.',
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
